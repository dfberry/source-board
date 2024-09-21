import "../../envConfig";
import { AppSessionResult, User, Session } from "./auth/types";


export const CONFIG = {
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
  GH_REDIRECT_URI: process.env.GH_REDIRECT_URI!,
  GH_OAUTH_STATE: process.env.GH_OAUTH_STATE!,
  TEST_ENV: process.env.TEST_ENV!,
  MY_ENV: process.env.MY_ENV!,
};

const userEnv = process.env['GH_TEST_USER'];
const sessionEnv = process.env['GH_TEST_SESSION'];

const parseJSON = <T>(jsonString: string | undefined): T | null => {
  try {
    return jsonString ? JSON.parse(jsonString) as T : null;
  } catch (error) {
    console.error(`Error parsing JSON for ${jsonString}:`, error);
    return null;
  }
};

export const testValidateRequest = (): AppSessionResult => {

  if((process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") && process.env.BYPASS_AUTH) {
  
    const auth = {
      user: parseJSON<User>(userEnv) ?? {},
      session: parseJSON<Session>(sessionEnv) ?? {},
      isAuthorized: !!(userEnv && userEnv.length > 2 && sessionEnv && sessionEnv.length > 2)
    } as AppSessionResult;

    console.log('testValidateRequest auth', auth);
    return auth;

  } else {
    throw new Error("Invalid environment");
  }
}