"use server"

import { prisma } from "@/lib/prisma"

export default async function getAllPersonas() {
    try{
        // skipping pagination as not really required for this project
        const personas = await prisma.persona.findMany({select:{id:true,name:true, systemPrompt:false}});
        return personas;
    }
    catch(e){
        // TODO : log errors
        console.error(e);
    }
}

export type Personas = Awaited<ReturnType<typeof getAllPersonas>>;