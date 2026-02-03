"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.post('/verify-email', {
        token: code
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark contents">
      <div className="bg-background-light dark:bg-background-dark font-display h-screen w-full overflow-hidden flex items-center justify-center text-slate-900 dark:text-white selection:bg-primary selection:text-white relative">
          
           {/* Background Gradients */}
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full max-w-md p-8 relative z-10">
            <div className="glass-panel p-8 rounded-[2rem] w-full">
              <div className="text-center mb-8">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-white text-2xl">verified_user</span>
                 </div>
                 <h2 className="text-3xl font-bold mb-2">Verify Email</h2>
                 <p className="text-slate-400">Enter the code sent to {email}</p>
              </div>

              {success ? (
                 <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="material-symbols-outlined text-green-500 text-3xl mb-2">check_circle</span>
                    <p className="text-green-500 font-bold">Verified Successfully!</p>
                    <p className="text-slate-400 text-sm mt-2">Redirecting to login...</p>
                 </div>
              ) : (
                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="group">
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1" htmlFor="code">Verification Code</label>
                    <input 
                        id="code"
                        type="text" 
                        className="w-full h-14 px-4 bg-[#131118]/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 text-center text-2xl tracking-widest"
                        placeholder="123456"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                  </div>

                  <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-full bg-gradient-to-r from-[#895bf5] to-[#7042d2] text-white font-bold text-lg shadow-[0_0_20px_rgba(137,91,245,0.4)] hover:shadow-[0_0_30px_rgba(137,91,245,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </div>
                        ) : 'Verify Code'}
                  </button>
                </form>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
