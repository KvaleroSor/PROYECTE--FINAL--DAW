// ============================================
// 2. SCHEMA COMPARTIDO (mismo para cliente y servidor)
// ============================================
//

import { z } from "zod";

export const registerSchema = z
    .object({
        email: z
            .email("Formato de email inválido")
            .min(1, "El email es obligatorio")
            .toLowerCase()
            .trim(),

        password: z
            .string()
            .min(8, "Mínimo 8 caracteres")
            .regex(
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                "Debe contener al menos un carácter especial | !@#$%^&*()_+-=[]{}|;:',.<>?/",
            ),

        confirmPassword: z.string(),

        name: z
            .string()
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(50, "El nombre no puede exceder 50 caracteres"),

        nomina: z
            .number({ invalid_type_error: "Debe ser un número válido" })
            .positive("La nómina debe ser positiva")
            .min(100, "La nómina mínima es 100€")
            .max(500000, "La nómina máxima es 500.000€")
            .multipleOf(0.01, "Usa máximo 2 decimales"),
    })

    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.email("Email inválido").toLowerCase(),
    password: z.string().min(1, "La contraseña es requerida"),
});
