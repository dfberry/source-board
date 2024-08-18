import { loadEnvConfig } from "@next/env";

console.log(`envConfig `, process.env);

const projectDir = process.cwd();
loadEnvConfig(projectDir);
