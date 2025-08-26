import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage without errors', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the page loaded successfully
    await expect(page).toHaveTitle(/limerIQ/i);
    
    // Check that the main heading is visible
    const heading = page.locator('h1:has-text("The IQ Behind Your AI")');
    await expect(heading).toBeVisible();
    
    // Check that the tagline is visible
    const tagline = page.locator('text=Open source workflow composer');
    await expect(tagline).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check Hero section
    const heroSection = page.locator('section:has(h1:has-text("The IQ Behind Your AI"))');
    await expect(heroSection).toBeVisible();
    
    // Check Problem/Solution section - updated selector
    const problemSection = page.locator('section:has(h2:has-text("Structure Beats Instructions"))');
    await expect(problemSection).toBeVisible();
    
    // Check Quick Start section
    const quickStartSection = page.locator('section:has(h2:has-text("Quick Start"))');
    await expect(quickStartSection).toBeVisible();
    
    // Check VSCode section
    const vscodeSection = page.locator('section:has(h2:has-text("Visual Workflow Designer"))');
    await expect(vscodeSection).toBeVisible();
  });

  test('should have working copy buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test copy buttons - look for buttons with Copy text or in code blocks
    const copyButtons = page.locator('button:has-text("Copy")');
    
    // Check that at least one copy button exists
    const count = await copyButtons.count();
    expect(count).toBeGreaterThan(0);
    
    // Click the first copy button and verify no errors occur
    if (count > 0) {
      await copyButtons.first().click();
      
      // Small delay to ensure clipboard operation completes
      await page.waitForTimeout(100);
      
      // Check that the page is still functional after clicking
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should have no console errors', async ({ page }) => {
    // Collect any console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate to the page
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check that there are no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for important meta tags
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBeTruthy();
    
    // Check for viewport meta tag
    const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewport).toContain('width=device-width');
  });
});