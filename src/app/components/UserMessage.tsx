
const UserMessage = ({message, time}:{message:string, time:string}) => {
  return (
    <div className="self-end">
      <div className="rounded-lg border border-[#cbdcf7] bg-[#edf4ff] px-5 py-3.75 text-[17px] leading-[1.48] text-slate-900">
        {message}
      </div>
      <p className="mt-2 mr-0.5 flex items-center justify-end gap-2 text-sm font-medium text-[#536176]">
        <span>{time}</span>
      </p>
    </div>
  );
}

export default UserMessage