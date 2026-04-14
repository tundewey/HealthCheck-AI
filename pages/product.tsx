// "use client"

// import Head from 'next/head';
// import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import remarkBreaks from 'remark-breaks';
// import { useAuth } from '@clerk/nextjs';
// import { fetchEventSource } from '@microsoft/fetch-event-source';

// export default function Product() {
//     const { getToken } = useAuth();
//     const [idea, setIdea] = useState<string>('…loading');

//     useEffect(() => {
//         let buffer = '';
//         let controller: AbortController | null = null;
//         let isConnecting = false;
//         let cancelled = false;

//         const connectWithFreshToken = async () => {
//             if (cancelled || isConnecting) return;
//             isConnecting = true;

//             try {
//                 if (controller) {
//                     controller.abort();
//                 }
//                 controller = new AbortController();

//                 const jwt = await getToken({ skipCache: true });
//                 if (!jwt) {
//                     setIdea('Authentication required');
//                     isConnecting = false;
//                     return;
//                 }

//                 await fetchEventSource('/api', {
//                     signal: controller.signal,
//                     headers: { Authorization: `Bearer ${jwt}` },
//                     onmessage(ev) {
//                         buffer += ev.data;
//                         setIdea(buffer);
//                     },
//                     onerror(err) {
//                         isConnecting = false;
//                         if (err instanceof Response && err.status === 403) {
//                             buffer = '';
//                             setIdea('Refreshing connection...');
//                             setTimeout(() => connectWithFreshToken(), 1000);
//                             return;
//                         }
//                         console.error('SSE error:', err);
//                     },
//                     onopen: async (response) => {
//                         if (response.ok) {
//                             isConnecting = false;
//                             return;
//                         }
//                         if (response.status === 403) {
//                             isConnecting = false;
//                             buffer = '';
//                             setIdea('Refreshing connection...');
//                             setTimeout(() => connectWithFreshToken(), 1000);
//                             throw new Error('Authentication failed — reconnecting');
//                         }
//                         isConnecting = false;
//                         let detail = '';
//                         try {
//                             const ct = response.headers.get('content-type') || '';
//                             if (ct.includes('application/json')) {
//                                 const j = (await response.json()) as { detail?: string };
//                                 detail = j?.detail ? String(j.detail) : JSON.stringify(j);
//                             } else {
//                                 detail = (await response.text()).slice(0, 800);
//                             }
//                         } catch {
//                             detail = 'Could not read error body';
//                         }
//                         setIdea(
//                             `**Something went wrong** (${response.status})\n\n${detail || 'No details'}`,
//                         );
//                         throw new Error(`HTTP ${response.status}`);
//                     },
//                     onclose() {
//                         isConnecting = false;
//                     },
//                 });
//             } catch (error) {
//                 isConnecting = false;
//                 if (cancelled || controller?.signal.aborted) return;
//                 console.error('Failed to connect:', error);
//                 setIdea('Connection failed. Please refresh the page.');
//             }
//         };

//         connectWithFreshToken();

//         return () => {
//             cancelled = true;
//             if (controller) {
//                 controller.abort();
//             }
//         };
//     }, [getToken]);

//     return (
//         <>
//             <Head>
//                 <title>Business Idea Generator</title>
//                 <meta name="description" content="AI-powered business idea generation" />
//             </Head>
//             <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
//                 <div className="container mx-auto px-4 py-12">
//                     <header className="text-center mb-12">
//                         <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//                             Business Idea Generator
//                         </h1>
//                         <p className="text-gray-600 dark:text-gray-400 text-lg">
//                             AI-powered innovation at your fingertips
//                         </p>
//                     </header>

//                     <div className="max-w-3xl mx-auto">
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
//                             {idea === '…loading' || idea === 'Refreshing connection...' ? (
//                                 <div className="flex items-center justify-center py-12">
//                                     <div className="animate-pulse text-gray-400">
//                                         {idea === 'Refreshing connection...'
//                                             ? 'Refreshing connection...'
//                                             : 'Generating your business idea...'}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="markdown-content text-gray-700 dark:text-gray-300">
//                                     <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
//                                         {idea}
//                                     </ReactMarkdown>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// }

// "use client"

// import Head from 'next/head';
// import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import remarkBreaks from 'remark-breaks';
// import { Protect, PricingTable, useAuth, UserButton } from '@clerk/nextjs';
// import { fetchEventSource } from '@microsoft/fetch-event-source';

// function IdeaGenerator() {
//     const { getToken } = useAuth();
//     const [idea, setIdea] = useState<string>('…loading');

//     useEffect(() => {
//         let buffer = '';
//         let controller: AbortController | null = null;
//         let isConnecting = false;
//         let cancelled = false;

//         const connectWithFreshToken = async () => {
//             if (cancelled || isConnecting) return;
//             isConnecting = true;

//             try {
//                 if (controller) {
//                     controller.abort();
//                 }
//                 controller = new AbortController();

//                 const jwt = await getToken({ skipCache: true });
//                 if (!jwt) {
//                     setIdea('Authentication required');
//                     isConnecting = false;
//                     return;
//                 }

//                 await fetchEventSource('/api', {
//                     signal: controller.signal,
//                     headers: { Authorization: `Bearer ${jwt}` },
//                     onmessage(ev) {
//                         buffer += ev.data;
//                         setIdea(buffer);
//                     },
//                     onerror(err) {
//                         isConnecting = false;
//                         if (err instanceof Response && err.status === 403) {
//                             buffer = '';
//                             setIdea('Refreshing connection...');
//                             setTimeout(() => connectWithFreshToken(), 1000);
//                             return;
//                         }
//                         console.error('SSE error:', err);
//                     },
//                     onopen: async (response) => {
//                         if (response.ok) {
//                             isConnecting = false;
//                             return;
//                         }
//                         if (response.status === 403) {
//                             isConnecting = false;
//                             buffer = '';
//                             setIdea('Refreshing connection...');
//                             setTimeout(() => connectWithFreshToken(), 1000);
//                             throw new Error('Authentication failed — reconnecting');
//                         }
//                         isConnecting = false;
//                         let detail = '';
//                         try {
//                             const ct = response.headers.get('content-type') || '';
//                             if (ct.includes('application/json')) {
//                                 const j = (await response.json()) as { detail?: string };
//                                 detail = j?.detail ? String(j.detail) : JSON.stringify(j);
//                             } else {
//                                 detail = (await response.text()).slice(0, 800);
//                             }
//                         } catch {
//                             detail = 'Could not read error body';
//                         }
//                         setIdea(
//                             `**Something went wrong** (${response.status})\n\n${detail || 'No details'}`,
//                         );
//                         throw new Error(`HTTP ${response.status}`);
//                     },
//                     onclose() {
//                         isConnecting = false;
//                     },
//                 });
//             } catch (error) {
//                 isConnecting = false;
//                 if (cancelled || controller?.signal.aborted) return;
//                 console.error('Failed to connect:', error);
//                 setIdea('Connection failed. Please refresh the page.');
//             }
//         };

//         connectWithFreshToken();

//         return () => {
//             cancelled = true;
//             if (controller) {
//                 controller.abort();
//             }
//         };
//     }, [getToken]);

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <header className="text-center mb-12">
//                 <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//                     Business Idea Generator
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 text-lg">
//                     AI-powered innovation at your fingertips
//                 </p>
//             </header>

//             <div className="max-w-3xl mx-auto">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
//                     {idea === '…loading' || idea === 'Refreshing connection...' ? (
//                         <div className="flex items-center justify-center py-12">
//                             <div className="animate-pulse text-gray-400">
//                                 {idea === 'Refreshing connection...'
//                                     ? 'Refreshing connection...'
//                                     : 'Generating your business idea...'}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="markdown-content text-gray-700 dark:text-gray-300">
//                             <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
//                                 {idea}
//                             </ReactMarkdown>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function Product() {
//     return (
//         <>
//             <Head>
//                 <title>Business Idea Generator</title>
//                 <meta name="description" content="AI-powered business idea generation" />
//             </Head>
//             <main className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
//                 <div className="absolute top-4 right-4 z-10">
//                     <UserButton showName afterSignOutUrl="/" />
//                 </div>

//                 <Protect
//                     plan="premium_subscription"
//                     fallback={
//                         <div className="container mx-auto px-4 py-12">
//                             <header className="text-center mb-12">
//                                 <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//                                     Choose Your Plan
//                                 </h1>
//                                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
//                                     Unlock unlimited AI-powered business ideas
//                                 </p>
//                             </header>
//                             <div className="max-w-4xl mx-auto">
//                                 <PricingTable />
//                             </div>
//                         </div>
//                     }
//                 >
//                     <IdeaGenerator />
//                 </Protect>
//             </main>
//         </>
//     );
// }

"use client"

import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Protect, PricingTable, useAuth, UserButton } from '@clerk/nextjs';
import DatePicker from 'react-datepicker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { fetchEventSource } from '@microsoft/fetch-event-source';

function ConsultationForm() {
    const { getToken } = useAuth();
    const [patientName, setPatientName] = useState('');
    const [visitDate, setVisitDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setOutput('');
        setLoading(true);

        const jwt = await getToken({ skipCache: true });
        if (!jwt) {
            setOutput('Authentication required');
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        let buffer = '';

        try {
            await fetchEventSource('/api/consultation', {
                signal: controller.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    patient_name: patientName,
                    date_of_visit: visitDate?.toISOString().slice(0, 10) ?? '',
                    notes,
                }),
                onmessage(ev) {
                    buffer += ev.data;
                    setOutput(buffer);
                },
                onopen: async (response) => {
                    if (response.ok) return;
                    let detail = '';
                    try {
                        const ct = response.headers.get('content-type') || '';
                        if (ct.includes('application/json')) {
                            const j = (await response.json()) as { detail?: string };
                            detail = j?.detail ? String(j.detail) : JSON.stringify(j);
                        } else {
                            detail = (await response.text()).slice(0, 800);
                        }
                    } catch {
                        detail = 'Could not read error body';
                    }
                    setOutput(
                        `**Something went wrong** (${response.status})\n\n${detail || 'No details'}`,
                    );
                    controller.abort();
                    setLoading(false);
                    throw new Error(`HTTP ${response.status}`);
                },
                onclose() {
                    setLoading(false);
                },
                onerror(err) {
                    if (err instanceof Response && err.status === 403) {
                        setOutput('Session expired — please refresh and try again.');
                    }
                    console.error('SSE error:', err);
                    setLoading(false);
                },
            });
        } catch {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Consultation Notes
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
                <div className="space-y-2">
                    <label
                        htmlFor="patient"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Patient Name
                    </label>
                    <input
                        id="patient"
                        type="text"
                        required
                        value={patientName}
                        onChange={(ev) => setPatientName(ev.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter patient's full name"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Date of Visit
                    </label>
                    <DatePicker
                        id="date"
                        selected={visitDate}
                        onChange={(d: Date | null) => setVisitDate(d)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Consultation Notes
                    </label>
                    <textarea
                        id="notes"
                        required
                        rows={8}
                        value={notes}
                        onChange={(ev) => setNotes(ev.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter detailed consultation notes..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    {loading ? 'Generating Summary...' : 'Generate Summary'}
                </button>
            </form>

            {output ? (
                <section className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="markdown-content text-gray-800 dark:text-gray-200 max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {output}
                        </ReactMarkdown>
                    </div>
                </section>
            ) : null}
        </div>
    );
}

export default function Product() {
    return (
        <>
            <Head>
                <title>Healthcare Consultation Assistant</title>
                <meta
                    name="description"
                    content="AI-powered medical consultation summaries"
                />
            </Head>
            <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="absolute top-4 right-4 z-10">
                    <UserButton showName afterSignOutUrl="/" />
                </div>

                <Protect
                    plan="premium_subscription"
                    fallback={
                        <div className="container mx-auto px-4 py-12">
                            <header className="text-center mb-12">
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                    Healthcare Professional Plan
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                                    Streamline patient consultations with AI-powered summaries
                                </p>
                            </header>
                            <div className="max-w-4xl mx-auto">
                                <PricingTable />
                            </div>
                        </div>
                    }
                >
                    <ConsultationForm />
                </Protect>
            </main>
        </>
    );
}