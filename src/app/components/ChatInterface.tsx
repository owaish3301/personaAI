"use client";

import React, { useOptimistic, useTransition, useRef } from "react";
import PersonaMessage from "./PersonaMessage";
import UserMessage from "./UserMessage";
import ScrollToBottom from "./ScrollToBottom";

interface Message {
  id: string;
  content: string;
  authorId: string | null;
  createdAt: Date;
  conversationId: string;
}

interface ChatInterfaceProps {
  initialMessages: Message[];
  personaId: string;
  personaName: string;
  chatSubmitAction: (formData: FormData) => Promise<void> | void;
}

const getAvatarGradient = (name: string) => {
  const gradients = [
    "from-orange-400 to-amber-500",
    "from-indigo-400 to-purple-500",
    "from-teal-400 to-emerald-500",
    "from-rose-400 to-pink-500",
    "from-blue-400 to-cyan-500",
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

const TypingIndicator = ({ pfp }: { pfp: string }) => {
  return (
    <div className="flex max-w-2xl items-start gap-3.5 md:gap-4 w-full animate-fade-in">
      {/* Avatar */}
      <div className="grid size-10.5 shrink-0 place-items-center rounded-xl bg-linear-135 from-amber-450 to-orange-500 font-extrabold text-white text-lg shadow-sm shadow-orange-500/10">
        {pfp}
      </div>
      
      {/* Typing Bubble */}
      <div className="flex-1 min-w-0">
        <div className="inline-block rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-[15px] leading-relaxed text-slate-850 shadow-xs dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="flex items-center gap-1.5 py-1 px-1">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatInterface({
  initialMessages,
  personaId,
  personaName,
  chatSubmitAction,
}: ChatInterfaceProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [optimisticMessages, addOptimistic] = useOptimistic(
    initialMessages,
    (state, action: { type: "add-typing"; content: string }) => [
      ...state,
      {
        id: `temp-user-${Date.now()}`,
        content: action.content,
        authorId: "temp-user",
        createdAt: new Date(),
        conversationId: "temp-conv",
      },
      {
        id: `temp-typing-${Date.now()}`,
        content: "TYPING",
        authorId: null,
        createdAt: new Date(),
        conversationId: "temp-conv",
      },
    ]
  );

  const grad = getAvatarGradient(personaName);

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get("message") as string;
    if (!text || !text.trim()) return;

    // Reset input field instantly
    formRef.current?.reset();

    startTransition(async () => {
      // Optimistically add user's message and the mentor's typing state
      addOptimistic({ type: "add-typing", content: text });
      
      try {
        await chatSubmitAction(formData);
      } catch (err) {
        console.error("Failed to submit chat:", err);
      }
    });
  };

  return (
    <section className="flex flex-col flex-1 h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Mentor Chat Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur-md dark:border-zinc-850 dark:bg-zinc-900/70 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-linear-135 font-extrabold text-white text-md shadow-sm ${grad}`}>
              {personaName.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 rounded-full bg-emerald-550 ring-2 ring-white dark:ring-zinc-900" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-800 dark:text-zinc-55 leading-tight">
              {personaName}
            </h2>
            <p className="text-xxs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <span>●</span> Online & Ready to Mentor
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Panel */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 space-y-6 chat-scroll bg-slate-50/50 dark:bg-zinc-950/20">
        {optimisticMessages && optimisticMessages.length > 0 ? (
          optimisticMessages.map((m) => {
            if (m.content === "TYPING" && !m.authorId) {
              return (
                <div key={m.id} className="flex w-full justify-start">
                  <TypingIndicator pfp={personaName.charAt(0)} />
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex w-full animate-fade-in-up ${
                  m.authorId ? "justify-end" : "justify-start"
                }`}
              >
                {m.authorId ? (
                  <UserMessage
                    message={m.content}
                    time={new Date(m.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  />
                ) : (
                  <PersonaMessage
                    pfp={personaName.charAt(0)}
                    message={m.content}
                    time={new Date(m.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-4">
            <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-linear-135 font-black text-white text-3xl shadow-md ${grad}`}>
              {personaName.charAt(0)}
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-slate-850 dark:text-zinc-100">
                Chat with {personaName}
              </h3>
              <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-xs leading-relaxed">
                Say hello to start getting guidance, learning concepts, or walking through code!
              </p>
            </div>
          </div>
        )}
        <ScrollToBottom messageCount={optimisticMessages?.length || 0} />
      </div>

      {/* Form Input Area */}
      <div className="border-t border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-zinc-850 dark:bg-zinc-900/70">
        <div className="mx-auto max-w-3xl">
          <form
            ref={formRef}
            action={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm transition-all duration-300 focus-within:border-orange-400 focus-within:ring-3 focus-within:ring-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-orange-500/40 dark:focus-within:ring-orange-500/10"
          >
            <input
              ref={inputRef}
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-[15px] text-slate-850 border-none outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              placeholder="Ask a question or request a code walkthrough..."
              name="message"
              autoComplete="off"
              disabled={isPending}
              type="text"
            />
            <button
              disabled={isPending}
              className="flex items-center justify-center gap-1.5 h-11 w-11 sm:w-auto sm:px-5 rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-60 disabled:pointer-events-none dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
              type="submit"
              aria-label="Send message"
            >
              {isPending ? (
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
          </form>
        </div>
      </div>

    </section>
  );
}
