interface PersonaMessageProps {
  pfp: string;
  message: string;
  time: string;
}

const PersonaMessage = ({ pfp, message, time }: PersonaMessageProps) => {
  return (
    <div className="flex max-w-2xl items-start gap-3.5 md:gap-4 w-full">
      {/* Avatar */}
      <div className="grid size-10.5 shrink-0 place-items-center rounded-xl bg-linear-135 from-amber-450 to-orange-500 font-extrabold text-white text-lg shadow-sm shadow-orange-500/10">
        {pfp}
      </div>
      
      {/* Message Bubble Container */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-[15px] leading-relaxed text-slate-850 shadow-xs transition-colors duration-300 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100">
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
        <p className="mt-1.5 ml-3.5 text-xxs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          {time}
        </p>
      </div>
    </div>
  );
};

export default PersonaMessage;