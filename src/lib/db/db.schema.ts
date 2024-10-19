import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

export const userTable = pgTable("osb_user", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    githubId: text("github_id").notNull(),
    username: text("username").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).default(sql`now()`).notNull(),
}, (table) => {
    return {
		uniqueGithubIdUsername: uniqueIndex("unique_username_githubId").on(table.githubId, table.username)
    };
});

export const sessionTable = pgTable("osb_session", {
	// Lucia doesn't want Session 'id' to have a default value.
	// Session Id is created by client.
    id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).default(sql`now()`).notNull(),
});
export const tokenTable = pgTable('osb_token', {
	id: text('id').primaryKey().default(sql`gen_random_uuid()`),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	accessToken: text('access_token').notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).default(sql`now()`).notNull(),
});

export const userWatchRepoTable = pgTable("osb_user_custom_config", {
	id: text("id").primaryKey().default(sql`gen_random_uuid()`),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	repoName: text("repo_name").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).default(sql`now()`).notNull(),
}, (table) => {
	return {
		uniqueUserRepo: uniqueIndex("unique_user_repo").on(table.userId, table.repoName)
	};
});
