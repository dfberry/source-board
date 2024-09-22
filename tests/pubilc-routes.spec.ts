import { test, expect } from '@playwright/test'

const aboutPageHeading = 'Open source board allows you to monitor all your open source projects in one place.';

test('navigates to the about page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /About/ }).click();
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(aboutPageHeading);
})