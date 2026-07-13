"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./SignOutButton";
import PersonaSelector from "./PersonaSelector";

interface AppLayoutProps {
  personas: any;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  children: React.ReactNode;
}

export default function AppLayout({ personas, user, children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper to get initials
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/80 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
            aria-label="Toggle sidebar menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 transition-all hover:opacity-90 dark:text-zinc-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-135 from-amber-400 to-orange-500 font-extrabold text-white shadow-md shadow-orange-500/20">
              P
            </span>
            <span className="text-xl font-extrabold bg-linear-to-r from-slate-950 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
              Persona <span className="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-medium">AI</span>
            </span>
          </Link>
        </div>

        {/* Top bar right buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <div className="hidden h-6 w-[1px] bg-slate-200 dark:bg-zinc-800 md:block" />
          
          {/* Quick User Avatar in header for desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-slate-200 dark:border-zinc-800 object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-135 from-slate-100 to-slate-200 text-xs font-semibold text-slate-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-300">
                {getInitials(user.name)}
              </div>
            )}
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 truncate max-w-28">
              {user.name.split(" ")[0]}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Sidebar Backing Backdrop (Mobile) */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/20 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Panel */}
        <aside
          className={`
            fixed bottom-0 top-16 z-35 flex w-76 flex-col border-r border-slate-200/80 bg-white transition-all duration-300 ease-in-out dark:border-zinc-800/80 dark:bg-zinc-900 lg:relative lg:top-0 lg:bottom-0 lg:z-10
            ${mobileMenuOpen ? "left-0" : "-left-76 lg:left-0"}
          `}
        >
          {/* Mentors Header */}
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Mentor Personas
            </h2>
          </div>

          {/* Mentors List Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-3 py-2 chat-scroll">
            <PersonaSelector personas={personas} />
          </div>

          {/* User Profile Info Footer inside Sidebar */}
          <div className="border-t border-slate-200/80 bg-slate-50/50 p-4 transition-colors duration-300 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full border border-slate-200/80 dark:border-zinc-850 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-135 from-amber-100 to-orange-100 text-sm font-bold text-orange-600 dark:from-zinc-800 dark:to-zinc-700 dark:text-orange-400">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-slate-800 dark:text-zinc-200">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-400 dark:text-zinc-500">
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="mt-3.5 flex justify-end">
              <SignOutButton />
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main
          className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300"
          onClick={() => {
            if (mobileMenuOpen) setMobileMenuOpen(false);
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
