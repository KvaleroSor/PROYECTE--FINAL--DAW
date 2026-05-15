import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Balance/);
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/');
    
    // Intentar login sin datos
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    
    // Verificar mensajes de error
    await expect(page.getByText(/email.*requerido/i)).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Rellenar formulario
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('password123');
    
    // Submit
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    
    // Verificar redirección al dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
