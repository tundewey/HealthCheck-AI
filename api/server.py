import os
from pathlib import Path

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials
from openai import APIError, APIStatusError, OpenAI, RateLimitError
from pydantic import BaseModel

GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

SYSTEM_PROMPT = """
You are provided with notes written by a doctor from a patient's visit.
Your job is to summarize the visit for the doctor and provide an email.
Reply with exactly three sections with the headings:
### Summary of visit for the doctor's records
### Next steps for the doctor
### Draft of email to patient in patient-friendly language
"""


class Visit(BaseModel):
    patient_name: str
    date_of_visit: str
    notes: str


def user_prompt_for(visit: Visit) -> str:
    return f"""Create the summary, next steps and draft email for:
Patient Name: {visit.patient_name}
Date of Visit: {visit.date_of_visit}
Notes:
{visit.notes}"""


def _openrouter_max_tokens() -> int:
    raw = os.getenv("OPENROUTER_MAX_TOKENS", "2048")
    try:
        return max(256, min(int(raw), 8192))
    except ValueError:
        return 2048


def _openai_client_and_model() -> tuple[OpenAI, str]:
    or_key = os.getenv("OPENROUTER_API_KEY")
    if or_key:
        referer = os.getenv("OPENROUTER_HTTP_REFERER", "https://localhost")
        title = os.getenv("OPENROUTER_APP_TITLE", "Healthcare Consultation Assistant")
        model = os.getenv(
            "OPENROUTER_MODEL",
            "google/gemini-2.5-flash",
        )
        client = OpenAI(
            base_url=OPENROUTER_BASE_URL,
            api_key=or_key,
            default_headers={
                "HTTP-Referer": referer,
                "X-Title": title,
            },
        )
        return client, model
    g_key = os.getenv("GOOGLE_API_KEY")
    if not g_key:
        raise RuntimeError(
            "Set OPENROUTER_API_KEY or GOOGLE_API_KEY for the LLM backend"
        )
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")
    client = OpenAI(
        base_url=GEMINI_BASE_URL,
        api_key=g_key,
    )
    return client, model


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_jwks = os.getenv("CLERK_JWKS_URL")
if not _jwks:
    raise RuntimeError("CLERK_JWKS_URL is required")
clerk_config = ClerkConfig(jwks_url=_jwks)
clerk_guard = ClerkHTTPBearer(clerk_config)


def _llm_error_response(exc: Exception) -> JSONResponse:
    if isinstance(exc, RateLimitError):
        return JSONResponse(
            status_code=429,
            content={"detail": "LLM rate limit exceeded. Try again later."},
        )
    if isinstance(exc, APIStatusError):
        code = getattr(exc, "status_code", None) or 502
        if code == 401 or code == 403:
            return JSONResponse(
                status_code=502,
                content={"detail": "LLM API key invalid or not permitted for this model."},
            )
        body = getattr(exc, "body", None) or str(exc)
        snippet = body if isinstance(body, str) else str(body)[:400]
        return JSONResponse(
            status_code=429 if code == 429 else 502,
            content={"detail": f"LLM provider error ({code}): {snippet}"},
        )
    if isinstance(exc, APIError):
        return JSONResponse(
            status_code=502,
            content={"detail": f"LLM error: {str(exc)[:400]}"},
        )
    return JSONResponse(
        status_code=500,
        content={"detail": f"{type(exc).__name__}: {str(exc)[:400]}"},
    )


def _sse_from_stream(stream) -> StreamingResponse:
    def event_stream():
        try:
            for chunk in stream:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta
                if delta is None:
                    continue
                text = delta.content
                if not text:
                    continue
                lines = text.split("\n")
                for line in lines[:-1]:
                    yield f"data: {line}\n\n"
                    yield "data:  \n"
                yield f"data: {lines[-1]}\n\n"
        except Exception as e:
            msg = str(e).replace("\n", " ")[:300]
            yield f"data: **Stream error:** {msg}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.post("/api/consultation")
def consultation_summary(
    visit: Visit,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
):
    _ = creds.decoded["sub"]
    try:
        client, model = _openai_client_and_model()
    except RuntimeError as e:
        return JSONResponse(status_code=503, content={"detail": str(e)})
    user_prompt = user_prompt_for(visit)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt},
    ]
    create_kwargs: dict = {
        "model": model,
        "messages": messages,
        "stream": True,
    }
    if os.getenv("OPENROUTER_API_KEY"):
        create_kwargs["max_tokens"] = _openrouter_max_tokens()
    try:
        stream = client.chat.completions.create(**create_kwargs)
    except Exception as e:
        return _llm_error_response(e)
    return _sse_from_stream(stream)


@app.get("/health")
def health_check():
    """Health check endpoint for AWS App Runner"""
    return {"status": "healthy"}


static_path = Path("static")
if static_path.exists():

    @app.get("/")
    async def serve_root():
        return FileResponse(static_path / "index.html")

    app.mount("/", StaticFiles(directory="static", html=True), name="static")
