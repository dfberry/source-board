// Important: import our fixtures.
//import { test, expect } from '../playwright/fixtures';
import { test, expect } from '@playwright/test'

test('watched repos & stats count is the same', async ({ page }) => {
  // Navigate to the home page
  //await page.goto('/')

  // Navigate to watched repos page
  //await page.getByRole('link', { name: 'Repos' }).click();
  await page.goto('/query/repos')
  const element = await page.getByText(/Watched repos:/i)
  console.log('element', element)
  const headingText = await element.innerText();

    // Parse the number of watched repos
  const watchedReposCount = parseInt(headingText.match(/\d+/)?.[0] || '0', 10);
  console.log(`Watched repos count: ${watchedReposCount}`);

  // Navigate to the stats page
  //await page.getByRole('link', { name: 'Stats' }).click();
  await page.goto('/query/stats')
  //await expect(page).toHaveURL('/query/stats');
  const statsHeading = await page.getByRole('heading', { name: 'Watched repo stats:' });
  const statsHeadingText = await statsHeading.innerText();

    // Parse the number from the stats heading text
  const statsReposCount = parseInt(statsHeadingText.match(/\d+/)?.[0] || '0', 10);
  console.log(`Watched repo stats count: ${statsReposCount}`);

  // Verify that the numbers are equal
  expect(watchedReposCount).toBe(statsReposCount);
});