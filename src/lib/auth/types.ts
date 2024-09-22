import type { Session, User } from "lucia";
export type { Session, User };
export interface SessionResult {
  user: User | null;
  session: Session | null;
}
export interface AppSessionResult extends SessionResult {
  isAuthorized: boolean;
}