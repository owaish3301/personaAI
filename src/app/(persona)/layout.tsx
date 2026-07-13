import getAllPersonas from "@/app/actions/personas";
import AppLayout from "@/app/components/AppLayout";
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
    <AppLayout personas={personas} user={session.user}>
      {children}
    </AppLayout>
  );
};

export default PersonaLayout;
