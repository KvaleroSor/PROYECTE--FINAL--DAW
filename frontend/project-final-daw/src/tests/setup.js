import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender expect con matchers de jest-dom
expect.extend(matchers);

// Cleanup después de cada test
afterEach(() => {
  cleanup();
});

// Mock de next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  useLocale: () => 'es',
}));

// Mock de next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock de next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        user_id: '123',
      },
      accessToken: 'test-token',
    },
    status: 'authenticated',
  }),
  signOut: vi.fn(),
}));
