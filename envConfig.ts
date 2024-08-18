import { loadEnvConfig } from '@next/env'
 
console.log(process.env)

const projectDir = process.cwd()
loadEnvConfig(projectDir)