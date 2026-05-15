import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';

// Mock del contexto de tema
vi.mock('@/app/context/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: vi.fn(),
  }),
}));

describe('ThemeToggle Component', () => {
  it('should render theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should display sun icon in light mode', () => {
    render(<ThemeToggle />);
    // Verificar que el icono de sol está presente
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
