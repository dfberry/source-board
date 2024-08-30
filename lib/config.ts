import "../envConfig";
import path from "path";
import fs from "fs";

export const CONFIG = {
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
  GH_REDIRECT_URI: process.env.GH_REDIRECT_URI!,
  GH_OAUTH_STATE: process.env.GH_OAUTH_STATE!,
  TEST_ENV: process.env.TEST_ENV!,
  MY_ENV: process.env.MY_ENV!,
};

export async function getPackageVersion() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const fileContents = await fs.promises.readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(fileContents);

  return packageJson?.version || "0.0.0";
}
