import getOrCreateConversation, { chatSubmit } from "@/app/actions/chat";
import ChatInterface from "@/app/components/ChatInterface";
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
    <ChatInterface
      initialMessages={message}
      personaId={personaId}
      personaName={conversation.persona.name}
      chatSubmitAction={chatSubmit.bind(null, personaId)}
    />
  );
};

export default Chat;
