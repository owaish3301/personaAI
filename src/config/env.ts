function validateAndReturnEnvVar(name:string):string {
    const val = process.env[name];
    if(!val){
        throw new Error(`${name} enviroment variable is not setup correctly`)
    }
    return val;
}

export const DATABASE_URL = validateAndReturnEnvVar("DATABASE_URL");
export const GITHUB_CLIENT_ID = validateAndReturnEnvVar("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = validateAndReturnEnvVar("GITHUB_CLIENT_SECRET");
export const GOOGLE_CLIENT_ID = validateAndReturnEnvVar("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = validateAndReturnEnvVar("GOOGLE_CLIENT_SECRET");
