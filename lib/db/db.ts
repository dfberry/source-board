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
import EncryptionService from "../encrypt";
import { GitHubUser } from "../github/user";
import { db } from "./connection";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export interface DatabaseUser {
  id: string;
  username: string;
  githubId: string;
}

async function updateDbToken(
  dbUserId: string,
  encryptedAccessToken: string,
): Promise<void> {
  if (!dbUserId || !encryptedAccessToken)
    throw new Error("updateDbToken: Invalid arguments");

  const updatedToken = await db
    .update(tokenTable)
    .set({ encryptedAccessToken })
    .where(eq(tokenTable.userId, dbUserId))
    .execute();
}
async function insertDbToken(
  dbUserId: string,
  accessToken: string,
): Promise<void> {
  if (!dbUserId || !accessToken)
    throw new Error("insertDbToken: Invalid arguments");

  const encryptor = new EncryptionService();
  const encryptedToken = encryptor.encrypt(accessToken);

  const { rowCount } = await db
    .delete(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();

  const insertedToken = await db
    .insert(tokenTable)
    .values({
      userId: dbUserId,
      encryptedAccessToken: encryptedToken,
    })
    .execute();
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
  const encryptor = new EncryptionService();

  if (!dbUserId || !githubUser.id || !githubUser.login)
    throw new Error("insertUser: Invalid arguments");

  const newUser = {
    id: dbUserId,
    githubId: encryptor.encrypt(githubUser.id.toString()),
    username: encryptor.encrypt(githubUser.login),
  };
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
    const encryptedId = new EncryptionService().encrypt(githubId.toString());

    const row = await db
      .select()
      .from(userTable)
      .where(eq(userTable.githubId, encryptedId))
      .execute();

    if (row.length === 0) return null;
    return row[0] as DatabaseUser;
  } catch (error) {
    console.error(`getDbUserByGithubId error: ${error}`);
    return null;
  }
}

async function getDbTokenByDbUserId(dbUserId: string): Promise<string | null> {
  if (!dbUserId) throw new Error("getDbTokenByDbUserId: Invalid arguments");

  const row = await db
    .select()
    .from(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();

  if (row.length === 0 || !row[0].encryptedAccessToken) {
    return null;
  }
  const encryptor = new EncryptionService();
  const decryptedToken = encryptor.decrypt(row[0].encryptedAccessToken);

  return decryptedToken;
}

async function deleteDbTokenByDbUserId(dbUserId: string): Promise<void> {
  if (!dbUserId) throw new Error("deleteDbTokenByDbUserId: Invalid arguments");

  const deletedTokens = await db
    .delete(tokenTable)
    .where(eq(tokenTable.userId, dbUserId))
    .execute();
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
