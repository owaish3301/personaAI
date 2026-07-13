import { ChatCompletionMessageParam } from "openai/resources";
import { Message } from "../../../generated/prisma/client";
import client from "./client";

export default async function chat(messagesList:Message[], systemPrompt:string) {
    const messages: ChatCompletionMessageParam[] = messagesList.map((message) => {
      return {
        role: message.authorId ? "user" : "assistant",
        content: message.content,
      };
    });
    const finalMessages: ChatCompletionMessageParam[] = [{role:"system", content:systemPrompt}, ...messages];
    const response = await client.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages : finalMessages,
    });

    const parsed = response.choices[0].message.content;
    return parsed;
}