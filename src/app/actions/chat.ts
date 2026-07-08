"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function getOrCreateConversation({
  userId,
  personaId,
}: {
  userId: string;
  personaId: string;
}) {
  return prisma.conversation.upsert({
    where: {
      personaId_userId: {
        personaId,
        userId,
      },
    },
    update: {},
    create: {
      userId,
      personaId,
    },
    select: {
      id: true,
      persona: true,
      message: {orderBy : {createdAt :"asc"}},
    },
  });
}

export async function chatSubmit(personaId: string, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth");

  const conversation = await getOrCreateConversation({
    userId: session.user.id,
    personaId,
  });

  const message = formData.get("message") as string;

  // save message in the db
  await prisma.message.create({
    data: {
      content: message,
      author: { connect: { id: session.user.id } },
      conversation: { connect: { id: conversation.id } },
    },
  });
  revalidatePath(`/chat/${personaId }`)
}
