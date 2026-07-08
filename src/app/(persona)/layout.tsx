import getAllPersonas from "@/app/actions/personas";
import PersonaSelector from "@/app/components/PersonaSelector";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PersonaLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth");
  }

  const personas = await getAllPersonas();

  return (
    <main className="h-screen w-full bg-white text-slate-900 overflow-auto">
      <header className="flex h-18 items-center justify-between border-b border-[#d9dee7] bg-white/95 px-6">
        <div className="flex items-center gap-9">
          <button className="grid h-4.5 w-6 gap-1.25" aria-hidden="true">
            <span className="h-0.5 rounded-full bg-slate-900" />
            <span className="h-0.5 rounded-full bg-slate-900" />
            <span className="h-0.5 rounded-full bg-slate-900" />
          </button>
          <h1 className="m-0 text-2xl leading-none font-bold">Persona AI</h1>
        </div>
      </header>

      <section className="flex h-[calc(100vh-72px)]">
        <aside className="border-r border-[#d9dee7] bg-white px-3 pt-4 hidden lg:block">
          <p className="mb-4 ml-4 text-sm font-medium text-[#536176]">
            MENTOR PERSONA
          </p>
          <PersonaSelector personas={personas} />
        </aside>

        {children}
      </section>
    </main>
  );
};

export default PersonaLayout;
