function validateAndReturnEnvVar(name:string):string {
    const val = process.env[name];
    if(!val){
        throw new Error(`${name} enviroment variable is not setup correctly`)
    }
    return val;
}

function validateOptionalUrlEnvVar(name:string):string | undefined {
    const val = process.env[name];
    if(!val){
        return undefined;
    }

    try {
        new URL(val);
        return val;
    } catch {
        throw new Error(`${name} must be a valid absolute URL`);
    }
}

export const DATABASE_URL = validateAndReturnEnvVar("DATABASE_URL");
export const GITHUB_CLIENT_ID = validateAndReturnEnvVar("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = validateAndReturnEnvVar("GITHUB_CLIENT_SECRET");
export const GOOGLE_CLIENT_ID = validateAndReturnEnvVar("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = validateAndReturnEnvVar("GOOGLE_CLIENT_SECRET");
export const OPENAI_API_KEY = validateAndReturnEnvVar("OPENAI_API_KEY");
export const OPENAI_BASE_URL = validateOptionalUrlEnvVar("OPENAI_BASE_URL");
