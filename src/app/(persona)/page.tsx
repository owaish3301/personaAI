import getAllPersonas from "@/app/actions/personas";
import Link from "next/link";

// Helper to generate unique gradients based on persona name
const getAvatarGradient = (name: string) => {
  const gradients = [
    "from-orange-450 to-amber-500 shadow-orange-500/10",
    "from-indigo-450 to-purple-500 shadow-indigo-500/10",
    "from-teal-450 to-emerald-500 shadow-emerald-500/10",
    "from-rose-450 to-pink-500 shadow-rose-500/10",
    "from-blue-450 to-cyan-500 shadow-blue-500/10",
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

export default async function Home() {
  const personas = await getAllPersonas() || [];

  return (
    <section className="flex-1 overflow-y-auto px-4 py-8 md:px-8 md:py-12 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 chat-scroll">
      <div className="mx-auto max-w-4xl space-y-12 animate-fade-in-up">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-3 py-1 text-xs font-semibold text-orange-600 dark:border-orange-500/20 dark:bg-orange-950/20 dark:text-orange-400">
            <span>✨ Powered by Advanced LLMs</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
            Choose Your <span className="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">AI Coding Mentor</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-500 dark:text-zinc-400 md:text-lg">
            Connect with virtual representations of world-class educators. Learn concepts, review systems architecture, and get step-by-step code walkthroughs.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">
            Available Mentors ({personas.length})
          </h3>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {personas.map((persona) => {
              const grad = getAvatarGradient(persona.name);
              return (
                <Link
                  href={`/chat/${persona.id}`}
                  key={persona.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md dark:border-zinc-850 dark:bg-zinc-900 dark:hover:border-orange-550/30"
                >
                  {/* Subtle top decoration */}
                  <div className="absolute right-0 top-0 h-16 w-16 opacity-10 bg-radial from-orange-500 to-transparent group-hover:opacity-20 transition-opacity" />

                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`grid size-14 place-items-center rounded-2xl bg-linear-135 font-extrabold text-2xl text-white shadow-md ${grad}`}>
                        {persona.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors">
                          {persona.name}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                          AI Expert Mentor
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Learn backend systems, full-stack architectures, code implementation details, and live debugging in the unique teaching style of {persona.name}.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-orange-600 dark:text-orange-400">
                    <span>Start conversation</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid gap-6 border-t border-slate-200/60 pt-10 dark:border-zinc-850 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-zinc-200">Interactive Coding</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Get hands-on coding help. Explain errors, write snippets, and iterate directly in your chats.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-zinc-200">Architectural Trade-offs</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Discuss databases, system scalability, message queues, and real-world system design decisions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-zinc-200">Tailored Guidance</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Each mentor responds in their signature style—helpful analogies, Hinglish slang, or system diagrams.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
