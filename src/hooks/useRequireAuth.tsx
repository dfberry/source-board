// hooks/useRequireAuth.tsx
import path from 'path';
import { validateRequest } from '@/lib/auth/auth';
import { testValidateRequest } from '@/lib/config';
import { SessionResult, AppSessionResult } from '@/lib/auth/types';
import { Lucia } from "lucia";
import { updateEnvVariableForTesting } from '@/lib/auth/update-env';

let savedAuthToEnv = false;
const envFilePath = path.resolve(__dirname, '@/.env');
console.log('envFilePath', envFilePath);

const useRequireAuth = async (): Promise<AppSessionResult> => {

  if ((process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") && process.env.BYPASS_AUTH) {
    return testValidateRequest();
  } else {
    const { user, session } = await validateRequest();

    console.log('useRequireAuth user', JSON.stringify(user));
    console.log('useRequireAuth session', JSON.stringify(session));

    const result = { user, session, isAuthorized: !!user };

    if (!savedAuthToEnv) {

      savedAuthToEnv = true;

    }

    console.log(JSON.stringify(result));
    return result;
  }
};

export const luciaValidateSession = async (lucia: Lucia, sessionId: string): Promise<SessionResult> => {

  if ((process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") && process.env.BYPASS_AUTH) {
    return testValidateRequest();
  } else {
    return await lucia.validateSession(sessionId);
  }

}

export default useRequireAuth;