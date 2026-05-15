import { describe, it, expect, vi, beforeEach } from 'vitest';
import changePassword from '@/services/users/changePassword';

// Mock de fetch global
global.fetch = vi.fn();

describe('changePassword Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call API with correct parameters', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ mensaje: 'Contraseña actualizada' }),
    };
    
    global.fetch.mockResolvedValueOnce(mockResponse);

    await changePassword('oldPass123', 'newPass456', 'test-token');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/change-password'),
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify({
          currentPassword: 'oldPass123',
          newPassword: 'newPass456',
        }),
      })
    );
  });

  it('should return success message on successful change', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ mensaje: '✅ ÉXITO - Contraseña actualizada correctamente' }),
    };
    
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await changePassword('oldPass', 'newPass', 'token');

    expect(result.mensaje).toContain('ÉXITO');
  });

  it('should throw error on failed request', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ mensaje: '❌ ERROR - La contraseña actual es incorrecta' }),
    };
    
    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(
      changePassword('wrongPass', 'newPass', 'token')
    ).rejects.toThrow();
  });

  it('should handle network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      changePassword('oldPass', 'newPass', 'token')
    ).rejects.toThrow('Network error');
  });
});
