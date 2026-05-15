import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BlurProvider, useBlur } from '@/app/context/BlurContext';

describe('useBlur Hook', () => {
  it('should provide initial blur state as false', () => {
    const { result } = renderHook(() => useBlur(), {
      wrapper: BlurProvider,
    });

    expect(result.current.isBlurred).toBe(false);
  });

  it('should toggle blur state', () => {
    const { result } = renderHook(() => useBlur(), {
      wrapper: BlurProvider,
    });

    act(() => {
      result.current.blurToggle();
    });

    expect(result.current.isBlurred).toBe(true);

    act(() => {
      result.current.blurToggle();
    });

    expect(result.current.isBlurred).toBe(false);
  });

  it('should persist blur state in localStorage', () => {
    const { result } = renderHook(() => useBlur(), {
      wrapper: BlurProvider,
    });

    act(() => {
      result.current.blurToggle();
    });

    // Verificar que se guardó en localStorage
    const stored = localStorage.getItem('isBlurred');
    expect(stored).toBe('true');
  });
});
