import { describe, it, expect } from 'vitest';

// Tests de validación de email
describe('Email Validation', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should validate correct email format', () => {
    expect(emailRegex.test('user@example.com')).toBe(true);
    expect(emailRegex.test('test.user@domain.co.uk')).toBe(true);
  });

  it('should reject invalid email format', () => {
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('@example.com')).toBe(false);
    expect(emailRegex.test('user@')).toBe(false);
  });
});

// Tests de validación de contraseña
describe('Password Validation', () => {
  const validatePassword = (password) => {
    return password && password.length >= 8;
  };

  it('should accept passwords with 8+ characters', () => {
    expect(validatePassword('12345678')).toBe(true);
    expect(validatePassword('SecurePass123')).toBe(true);
  });

  it('should reject passwords with less than 8 characters', () => {
    expect(validatePassword('1234567')).toBe(false);
    expect(validatePassword('short')).toBe(false);
  });

  it('should reject empty or null passwords', () => {
    expect(validatePassword('')).toBe(false);
    expect(validatePassword(null)).toBe(false);
    expect(validatePassword(undefined)).toBe(false);
  });
});

// Tests de cálculos financieros
describe('Financial Calculations', () => {
  it('should calculate percentage correctly', () => {
    const calculatePercentage = (value, total) => (value / total) * 100;
    
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(25, 100)).toBe(25);
    expect(calculatePercentage(1000, 2000)).toBe(50);
  });

  it('should calculate budget distribution', () => {
    const nomina = 2000;
    const savingsPercent = 20;
    const expectedSavings = (nomina * savingsPercent) / 100;
    
    expect(expectedSavings).toBe(400);
  });
});
