
const PersonaMessage = ({pfp, message, time}:{pfp:string, message:string, time:string}) => {
  return (
    <div className="flex max-w-165 items-start gap-4 max-[920px]:max-w-full">
      <div className="grid size-10.75 shrink-0 place-items-center rounded-full bg-linear-135 from-[#ffb21a] to-[#ff7a00] text-[22px] font-bold text-white">
        {pfp}
      </div>
      <div>
        <div className="min-w-106.5 rounded-[10px] border border-[#dfe4ec] bg-[#f4f5f7] px-5.25 py-3.75 text-[17px] leading-[1.48] text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.05)] max-[920px]:min-w-0">
          {message}
        </div>
        <p className="mt-2 ml-5 text-sm font-medium text-[#536176]">{time}</p>
      </div>
    </div>
  );
}

export default PersonaMessage;