import { OPENAI_API_KEY, OPENAI_BASE_URL } from "@/config/env"
import { OpenAI } from "openai"

const client = new OpenAI({
    apiKey : OPENAI_API_KEY,
    ...(OPENAI_BASE_URL ? { baseURL : OPENAI_BASE_URL } : {}),
});

export default client;
