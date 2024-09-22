import { promises as fs } from 'fs';
import path from 'path';

export async function updateEnvVariableForTesting(envFilePath: string, name: string, value: string): Promise<void> {

    if (process.env.NODE_ENV === 'production') return;

    try {

        const envPath = path.resolve(envFilePath);

        // Read the .env file
        let envContent = await fs.readFile(envPath, 'utf8');

        // Create a regular expression to find the variable
        const regex = new RegExp(`^(#?${name})=.*`, 'm');

        // Check if the variable exists
        if (regex.test(envContent)) {
            // Replace the existing variable
            envContent = envContent.replace(regex, `$1=${value}`);
        } else {
            // Append the new variable
            envContent += `\n${name}=${value}`;
        }

        // Write the updated content back to the .env file
        await fs.writeFile(envPath, envContent, 'utf8');
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error updating .env file: ${error.message}`);
        } else {
            console.error('Error updating .env file:', error);
        }
    }
}