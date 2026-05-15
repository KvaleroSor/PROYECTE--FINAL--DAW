import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login previo (ajustar según tu flujo)
    await page.goto('/');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('password123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL(/.*dashboard/);
    
    // Navegar a settings
    await page.goto('/dashboard/settings');
  });

  test('should display settings page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /configuración/i })).toBeVisible();
  });

  test('should open change password modal', async ({ page }) => {
    await page.getByRole('button', { name: /cambiar contraseña/i }).click();
    
    await expect(page.getByText(/contraseña actual/i)).toBeVisible();
    await expect(page.getByText(/nueva contraseña/i)).toBeVisible();
  });

  test('should change language', async ({ page }) => {
    // Click en selector de idioma
    await page.getByRole('button', { name: /español/i }).click();
    
    // Seleccionar inglés
    await page.getByText('English').click();
    
    // Verificar cambio de URL
    await expect(page).toHaveURL(/.*\/en\//);
  });

  test('should toggle theme', async ({ page }) => {
    // Click en toggle de tema
    await page.getByRole('button', { name: /tema/i }).click();
    
    // Verificar que el body tiene clase dark
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });
});
