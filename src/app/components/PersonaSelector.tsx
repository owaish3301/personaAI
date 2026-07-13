"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Personas } from "../actions/personas";

// Helper to generate unique gradients based on persona name
const getAvatarGradient = (name: string) => {
  const gradients = [
    "from-orange-400 to-amber-500 shadow-orange-500/10",
    "from-indigo-400 to-purple-500 shadow-indigo-500/10",
    "from-teal-400 to-emerald-500 shadow-emerald-500/10",
    "from-rose-400 to-pink-500 shadow-rose-500/10",
    "from-blue-400 to-cyan-500 shadow-blue-500/10",
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

const PersonaSelector = ({ personas }: { personas: Personas }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1.5">
      {personas && personas.length > 0 ? (
        personas.map((persona) => {
          const isActive = pathname === `/chat/${persona.id}`;
          const grad = getAvatarGradient(persona.name);
          return (
            <Link
              href={`/chat/${persona.id}`}
              key={persona.id}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? "bg-linear-135 from-amber-500 to-orange-550 text-white shadow-md shadow-orange-550/20"
                  : "bg-white hover:bg-slate-100/70 border border-slate-100/50 text-slate-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 dark:border-zinc-850 dark:text-zinc-200"
              }`}
            >
              <div
                className={`grid size-11 shrink-0 place-items-center rounded-xl bg-linear-135 font-bold shadow-sm text-lg text-white ${
                  isActive ? "bg-white/15 border border-white/20" : grad
                }`}
              >
                {persona.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-bold text-sm tracking-wide truncate ${
                    isActive ? "text-white" : "text-slate-800 dark:text-zinc-100"
                  }`}
                >
                  {persona.name}
                </p>
                <p
                  className={`text-xxs mt-0.5 truncate uppercase tracking-widest ${
                    isActive ? "text-orange-100" : "text-slate-400 dark:text-zinc-500"
                  }`}
                >
                  Coding Mentor
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-center py-8 text-sm text-slate-400 dark:text-zinc-500">
          No personas available
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
export type { Personas };
