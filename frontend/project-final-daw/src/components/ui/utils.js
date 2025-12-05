import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS con clsx y tailwind-merge
 * @param {...any} inputs - Clases CSS a combinar
 * @returns {string} - Clases CSS combinadas y optimizadas
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}