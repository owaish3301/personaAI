"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

export default function AuthPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (e) {
      console.error(e);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/5 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/5 pointer-events-none" />

      {/* Auth Card Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-zinc-850 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100 dark:shadow-none space-y-8">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3.5">
            <div className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-135 from-amber-450 to-orange-500 font-black text-2xl text-white shadow-lg shadow-orange-500/20">
              P
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-zinc-55">
                Persona <span className="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Sign in to chat with your personal AI coding mentors
              </p>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            {/* Google button */}
            <button
              onClick={() => handleSignIn("google")}
              disabled={loadingProvider !== null}
              className="w-full flex items-center justify-center gap-3.5 h-12 rounded-xl border border-slate-200 bg-white px-4 text-[15px] font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-350 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/80 dark:hover:border-zinc-700"
            >
              {loadingProvider === "google" ? (
                <svg className="animate-spin h-5 w-5 text-slate-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.328 0-6.035-2.707-6.035-6.035s2.707-6.035 6.035-6.035c1.523 0 2.915.567 3.986 1.498l3.053-3.053C19.043 2.87 15.897 2 12.24 2 6.64 2 2 6.64 2 12.24s4.64 10.24 10.24 10.24c5.795 0 10.24-4.114 10.24-10.24 0-.689-.082-1.353-.24-1.955H12.24z"
                  />
                  <path
                    fill="#4285F4"
                    d="M22.24 12.24c0-.689-.082-1.353-.24-1.955H12.24v4.114h6.887c-.297 1.103-.966 2.062-1.855 2.766l2.969 2.298c1.737-1.603 2.723-3.965 2.723-6.963l-.724-.26z"
                  />
                  <path
                    fill="#34A853"
                    d="M12.24 22.48c2.784 0 5.122-.924 6.828-2.51l-2.969-2.298c-.822.55-1.874.876-3.045.876-2.617 0-4.488-1.704-5.136-4.114l-3.078 2.383c1.71 3.396 5.21 5.663 9.4 5.663z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M7.104 14.434c-.162-.482-.254-.997-.254-1.534s.092-1.052.254-1.534L4.026 8.983C3.36 10.297 3 11.777 3 13.3c0 1.523.36 3.003 1.026 4.317l3.078-3.183z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* GitHub button */}
            <button
              onClick={() => handleSignIn("github")}
              disabled={loadingProvider !== null}
              className="w-full flex items-center justify-center gap-3.5 h-12 rounded-xl border border-slate-200 bg-white px-4 text-[15px] font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-350 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/80 dark:hover:border-zinc-700"
            >
              {loadingProvider === "github" ? (
                <svg className="animate-spin h-5 w-5 text-slate-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Footer disclaimer */}
          <p className="text-center text-xs leading-normal text-slate-400 dark:text-zinc-500 max-w-[280px] mx-auto">
            By continuing, you agree to connect your account to Persona AI and authorize access.
          </p>

        </div>
      </div>
    </div>
  );
}
