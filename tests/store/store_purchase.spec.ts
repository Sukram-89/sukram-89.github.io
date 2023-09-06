import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://hoff.is/store/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Hoff Store/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://hoff.is/store/');
  await expect(page.getByTestId('money')).toHaveText('10000')
});

