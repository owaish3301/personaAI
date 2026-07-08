import Link from "next/link";
import type { Personas } from "../actions/personas";

const PersonaSelector = ({ personas }: { personas: Personas }) => {
  return (
      <div className="flex flex-col gap-2">
        {personas &&
          personas.map((persona) => {
            return (
              <Link
                href={`/chat/${persona.id}`}
                key={persona.id}
                className="flex items-center gap-4 hover:cursor-pointer rounded-md border border-[#ffd5b0] border-l-[3px] border-l-[#ff8a00] bg-[#fff7ef] px-4 py-2"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-135 from-[#ffb21a] to-[#ff7a00] text-[22px] font-bold text-white">
                  {persona.name.charAt(0)}
                </div>
                <div className="">
                  <p className="mb-1.5 text-xl font-bold text-slate-900 truncate min-w-32 max-w-38">
                    {persona.name}
                  </p>
                </div>
              </Link>
            );
          })
        }
        {
            !personas && <div>No personas available</div>
        }
      </div>
  );
};

export default PersonaSelector;
