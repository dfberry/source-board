import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const githubUser = process.env.GH_TEST_USER
const githubPassword = process.env.GH_TEST_PASSWORD
const redirectUrl = process.env.GH_TEST_REDIRECT_URL

export async function authSetup(page: any):Promise<void>{
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill(githubUser!);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(githubPassword!);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('link', { name: 'Create repository' })).toBeVisible();
}

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await authSetup(page)
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});