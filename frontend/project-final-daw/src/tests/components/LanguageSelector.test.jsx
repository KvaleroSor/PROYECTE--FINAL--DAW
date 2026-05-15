import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/LanguageSelector';

// Mock de i18n/navigation
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/dashboard',
}));

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['es', 'ca', 'en'],
  },
}));

describe('LanguageSelector Component', () => {
  it('should render language selector', () => {
    render(<LanguageSelector />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show dropdown when clicked', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button');
    
    fireEvent.mouseEnter(button);
    
    // Verificar que aparecen los idiomas
    expect(screen.getByText('es')).toBeInTheDocument();
    expect(screen.getByText('ca')).toBeInTheDocument();
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('should display current locale', () => {
    render(<LanguageSelector />);
    // El locale actual debería estar marcado
    expect(screen.getByText('es')).toBeInTheDocument();
  });
});
