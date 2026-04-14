// "use client"

// import Link from 'next/link';
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto px-4 py-12">
//         {/* Navigation */}
//         <nav className="flex justify-between items-center mb-12">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
//             IdeaGen
//           </h1>
//           <div>
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </SignedOut>
//             <SignedIn>
//               <div className="flex items-center gap-4">
//                 <Link 
//                   href="/product" 
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
//                 >
//                   Go to App
//                 </Link>
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//             </SignedIn>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="text-center py-24">
//           <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
//             Generate Your Next
//             <br />
//             Big Business Idea
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
//             Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
//           </p>
          
//           <SignedOut>
//             <SignInButton mode="modal">
//               <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
//                 Get Started Free
//               </button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <Link href="/product">
//               <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
//                 Generate Ideas Now
//               </button>
//             </Link>
//           </SignedIn>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client"

// import Link from 'next/link';
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto px-4 py-12">
//         <nav className="flex justify-between items-center mb-12">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
//             IdeaGen Pro
//           </h1>
//           <div>
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </SignedOut>
//             <SignedIn>
//               <div className="flex items-center gap-4">
//                 <Link
//                   href="/product"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
//                 >
//                   Go to App
//                 </Link>
//                 <UserButton showName afterSignOutUrl="/" />
//               </div>
//             </SignedIn>
//           </div>
//         </nav>

//         <div className="text-center py-24">
//           <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
//             Generate Your Next
//             <br />
//             Big Business Idea
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
//             Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
//           </p>

//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 max-w-sm mx-auto mb-8">
//             <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
//               Premium Subscription
//             </h3>
//             <p className="text-4xl font-bold text-blue-600 mb-2">
//               $10<span className="text-lg text-gray-600 dark:text-gray-400">/month</span>
//             </p>
//             <ul className="text-left text-gray-600 dark:text-gray-400 mb-2">
//               <li className="mb-2">✓ Unlimited idea generation</li>
//               <li className="mb-2">✓ Advanced AI models</li>
//               <li className="mb-2">✓ Priority support</li>
//             </ul>
//           </div>

//           <SignedOut>
//             <SignInButton mode="modal">
//               <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
//                 Start Your Free Trial
//               </button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <Link href="/product">
//               <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
//                 Access Premium Features
//               </button>
//             </Link>
//           </SignedIn>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client"

import Link from 'next/link';
import Head from 'next/head';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <Head>
        <title>Healthcare Consultation Assistant</title>
        <meta
          name="description"
          content="AI-powered medical consultation summaries"
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex justify-between items-center mb-12">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              MediNotes Pro
            </h1>
            <div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link
                    href="/product"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Go to App
                  </Link>
                  <UserButton showName afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </nav>

          <div className="text-center py-16">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Transform Your
              <br />
              Consultation Notes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              AI-powered assistant for professional summaries, action items, and
              patient-friendly communications
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Professional Summaries
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Medical record summaries from your notes
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">✅</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Action Items
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Next steps and follow-ups for each visit
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">📧</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Patient Emails
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Draft patient-friendly emails automatically
                  </p>
                </div>
              </div>
            </div>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                  Start Free Trial
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/product">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                  Open Consultation Assistant
                </button>
              </Link>
            </SignedIn>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Demo only — not for real PHI without proper compliance</p>
          </div>
        </div>
      </main>
    </>
  );
}