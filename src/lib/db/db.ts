import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  userTable,
  sessionTable,
  tokenTable,
  userWatchRepoTable,
} from "./db.schema";
import { eq } from "drizzle-orm";
import { GitHubUser } from "../github/user";
import { db } from "./connection";

// Lucia doesn't want Session 'id' to have a default value. 
const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export interface DatabaseUser {
  id: string;
  username: string;
  githubId: string;
}

async function updateDbToken(
  dbUserId: string,
  accessToken: string,
): Promise<void> {
  if (!dbUserId || !accessToken)
    throw new Error("updateDbToken: Invalid arguments");

  const updatedToken = await db
    .update(tokenTable)
    .set({ accessToken })
    .where(eq(tokenTable.userId, dbUserId))
    .execute();

  console.log(`updateDbToken: `, updatedToken);
}
async function insertDbToken(
  dbUserId: string,
  accessToken: string,
): Promise<void> {
  console.log(`insertDbToken: `, dbUserId, accessToken);
  if (!dbUserId || !accessToken)
    throw new Error("insertDbToken: Invalid arguments");

  console.log(`insertDbToken encryptedToken: `, accessToken);
  console.log(`insertDbToken dbUserId: `, dbUserId);

  const { rowCount } = await db
    .delete(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();

  console.log(`insertDbToken deletedTokens rowcount: `, rowCount);

  const insertedToken = await db
    .insert(tokenTable)
    .values({
      userId: dbUserId,
      accessToken: accessToken,
    })
    .execute();

  console.log(`insertDbToken: `, insertedToken);
}
function convertGitHubUserToDatabaseUser(
  newDbUserId: string,
  githubUser: GitHubUser,
): DatabaseUser {
  return {
    id: newDbUserId,
    githubId: githubUser.github_id,
    username: githubUser.login,
  };
}

async function insertDbUser(
  dbUserId: string,
  githubUser: Pick<GitHubUser, "id" | "login">,
) {
  console.log(`insertDbUser: `, dbUserId, githubUser);

  if (!dbUserId || !githubUser.id || !githubUser.login)
    throw new Error("insertUser: Invalid arguments");

  const newUser = {
    id: dbUserId,
    githubId: githubUser.id.toString(),
    username: githubUser.login,
  };
  console.log(`insertDbUser: `, newUser);

  await db.insert(userTable).values(newUser).execute();
}
/**
 * SECURITY RISK: This function may expose the accessToken.
 * Ensure that the accessToken is handled securely and not logged or exposed in any way.
 */
async function getDbUserByGithubId(
  githubId: string,
): Promise<DatabaseUser | null> {
  try {
    if (!githubId) throw new Error("getDbUserByGithubId: Invalid arguments");

    const row = await db
      .select()
      .from(userTable)
      .where(eq(userTable.githubId, githubId))
      .execute();

    if (row.length === 0) return null;
    return row[0] as DatabaseUser;
  } catch (error) {
    console.error(`getDbUserByGithubId error: ${error}`);
    return null;
  }
}

async function getDbTokenByDbUserId(dbUserId: string): Promise<string | null> {
  
  console.log(`getDbTokenByDbUserId encrypted user id: ${dbUserId}`);
  if (!dbUserId) throw new Error("getDbTokenByDbUserId: Invalid arguments");

  const row = await db
    .select()
    .from(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();

  if (row.length === 0 || !row[0].accessToken) {
    console.log(`getDbTokenByDbUserId: No token found`);
    return null;
  }

  return row[0].accessToken;
}

async function deleteDbTokenByDbUserId(dbUserId: string): Promise<void> {
  if (!dbUserId) throw new Error("deleteDbTokenByDbUserId: Invalid arguments");

  const deletedTokens = await db
    .delete(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();
  console.log(`deleteDbTokenByDbUserId: `, deletedTokens);
}

export {
  db,
  userTable,
  sessionTable,
  adapter,
  tokenTable,
  updateDbToken,
  insertDbToken,
  insertDbUser,
  deleteDbTokenByDbUserId,
  convertGitHubUserToDatabaseUser,
  getDbUserByGithubId,
  getDbTokenByDbUserId,
};
