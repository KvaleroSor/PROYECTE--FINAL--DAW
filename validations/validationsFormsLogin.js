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

export const percentageSchema = z
    .object({
        fixedExpenses: z.number().min(0).max(100),
        leisureExpenses: z.number().min(0).max(100),
        investment: z.number().min(0).max(100),
        savings: z.number().min(0).max(100),
        nomina: z.number().min(0, "La nómina debe ser mayor a 0"),
    })
    .refine(
        (data) =>
            data.fixedExpenses +
                data.leisureExpenses +
                data.investment +
                data.savings ===
            100,
        { message: "Los porcentajes deben sumar exactamente 100%" },
    );

export const spendSchema = z.object({
    description: z.string().min(1, "La descripción es obligatoria").max(100),
    amount: z.number().positive("El importe debe ser mayor a 0"),
    category_id: z.string().min(1, "Selecciona una categoría"),
    payment_type: z.string().min(1, "Selecciona un tipo de pago"),
    date: z.date(),
});

export const createCategorySchema = (isSavingFromNomina) =>
    z.object({
        name: z.string().min(1, "El nombre es obligatorio").max(50),
        monthly_budget: z.coerce
            .number()
            .positive("El presupuesto debe ser mayor que 0")
            .max(
                isSavingFromNomina,
                `El presupuesto no puede exceder ${isSavingFromNomina} €`,
            ),
        icon: z.string().min(1, "Selecciona un icono"),
        type: z
            .string()
            .min(1, "Selecciona un tipo de categoría")
            .refine(
                (val) =>
                    ["Gasto Fijo", "Gasto Ocio", "Imprevistos"].includes(val),
                { message: "Selecciona un tipo de categoría válido" },
            ),
    });
