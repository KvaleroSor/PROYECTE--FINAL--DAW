import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Crear helpers de navegación que incluyen el locale automáticamente
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
