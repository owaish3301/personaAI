import getOrCreateConversation, { chatSubmit } from "@/app/actions/chat";
import PersonaMessage from "@/app/components/PersonaMessage";
import UserMessage from "@/app/components/UserMessage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Chat = async ({ params }: { params: Promise<{ personaId: string }> }) => {
  const { personaId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth");
  const userId = session?.user.id;

  const conversation = await getOrCreateConversation({ userId, personaId });
  const message = conversation.message;

  return (
    <section className="bg-white pt-4 px-6 w-full relative">
      <div className="flex flex-col gap-13 overflow-auto max-h-[calc(100vh-72px-72px)] no-scrollbar">
        {message.map((m) => (
          <div key={m.id}>
            {m.authorId && (
              <UserMessage
                message={m.content}
                time={new Date(m.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              />
            )}
            {!m.authorId && (
              <PersonaMessage
                pfp={conversation.persona.name.charAt(0)}
                message={m.content}
                time={new Date(m.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              />
            )}
          </div>
        ))}
      </div>

      <form action={chatSubmit.bind(null, personaId)}>
        <div className="absolute left-8 right-8 bottom-2 flex h-16 items-center gap-4 rounded-lg border border-[#cfd6e1] bg-white py-3 px-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <input
            className="flex-1 text-lg text-[#6b7688] border-none outline-none focus:outline-none focus:ring-0"
            placeholder="Ask me something..."
            name="message"
          />

          <button
            className="h-12.5 w-27 rounded-lg bg-slate-900 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};

export default Chat;
