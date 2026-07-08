import { prisma } from "../lib/prisma";

async function addPersona(name: string, systemPrompt: string) {
  await prisma.persona.create({
    data: {
      name,
      systemPrompt,
    },
  });
}

async function updateSystemPrompt(name: string, newSystemPrompt: string) {
    const res = await prisma.persona.findFirst({ where: { name } });
    if (!res) {
        console.error("Not found");
        return;
    }
    await prisma.persona.update({
        where: {
            id: res.id,
        },
        data: { systemPrompt: newSystemPrompt },
    });
}

addPersona("Hitesh Choudhary", "sdkujfsdh sdjhkfbsdj sdhfbsd fksdafs fksdfb");