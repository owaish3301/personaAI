interface UserMessageProps {
  message: string;
  time: string;
}

const UserMessage = ({ message, time }: UserMessageProps) => {
  return (
    <div className="flex flex-col items-end max-w-2xl w-full">
      {/* Message Bubble */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-[15px] leading-relaxed text-slate-850 shadow-xxs transition-colors duration-300 dark:border-indigo-950 dark:bg-indigo-950/30 dark:text-zinc-100">
        <p className="whitespace-pre-wrap break-words">{message}</p>
      </div>
      
      {/* Message Time */}
      <p className="mt-1.5 mr-3.5 text-xxs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
        {time}
      </p>
    </div>
  );
};

export default UserMessage;