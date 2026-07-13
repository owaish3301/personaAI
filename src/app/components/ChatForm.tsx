"use client";

import React, { useRef } from "react";
import { useFormStatus } from "react-dom";

interface ChatFormProps {
  onSubmitAction: (formData: FormData) => Promise<void> | void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex items-center justify-center gap-1.5 h-11 w-11 sm:w-auto sm:px-5 rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-60 disabled:pointer-events-none dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
      type="submit"
      aria-label="Send message"
    >
      {pending ? (
        <svg className="animate-spin h-5 w-5 text-white dark:text-zinc-950" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          <span className="hidden sm:inline">Send</span>
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function ChatForm({ onSubmitAction }: ChatFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const msg = formData.get("message") as string;
    if (!msg || !msg.trim()) return;
    
    // Reset input immediately on submit for instant feedback feeling
    formRef.current?.reset();
    
    try {
      await onSubmitAction(formData);
    } catch (e) {
      console.error("Failed to send message:", e);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm transition-all duration-300 focus-within:border-orange-400 focus-within:ring-3 focus-within:ring-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-orange-500/40 dark:focus-within:ring-orange-500/10"
    >
      <input
        className="flex-1 min-w-0 bg-transparent px-3 py-2 text-[15px] text-slate-850 border-none outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        placeholder="Ask a question or request a code walkthrough..."
        name="message"
        autoComplete="off"
        type="text"
      />
      <SubmitButton />
    </form>
  );
}
