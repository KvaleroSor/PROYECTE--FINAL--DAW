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
                "Debe contener al menos un carácter especial | !@#$%^&*()_+-=[]{}|;:',.<>?/"
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
        { message: "Los porcentajes deben sumar exactamente 100%" }
    );

export const createSpendSchema = (maxToSpend) =>
    z.object({
        description: z
            .string()
            .min(1, "La descripción es obligatoria")
            .max(100),
        amount: z.any().transform((val, ctx) => {
            if (val === "" || val === undefined || val === null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El importe es obligatorio",
                });
                return z.NEVER;
            }
            const parsed = Number(val);
            if (isNaN(parsed)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Introduce un número válido",
                });
                return z.NEVER;
            }
            if (parsed <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El importe debe ser mayor a 0",
                });
                return z.NEVER;
            }
            if (parsed > maxToSpend) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El gasto no puede exceder ${maxToSpend.toFixed(
                        2
                    )} €`,
                });
                return z.NEVER;
            }
            return parsed;
        }),
        date: z.coerce.date({
            errorMap: () => ({ message: "Selecciona una fecha válida" }),
        }),
        payment_type: z
            .string()
            .min(1, "Selecciona un tipo de pago")
            .refine(
                (val) => ["Tarjeta", "Efectivo", "Transferencia"].includes(val),
                { message: "Selecciona un tipo de pago" }
            ),
    });

export const createCategorySchema = (isMaxToSpend) =>
    z.object({
        name: z.string().min(1, "El nombre es obligatorio").max(50),
        monthly_budget: z.coerce
            .number()
            .positive("Debe ser un número positivo"),
        // monthly_budget: z.any().transform((val, ctx) => {
        //     if (val === "" || val === undefined || val === null) {
        //         ctx.addIssue({
        //             code: z.ZodIssueCode.custom,
        //             message: "El importe es obligatorio",
        //         });
        //         return z.NEVER;
        //     }
        //     const parsed = Number(val);
        //     if (isNaN(parsed)) {
        //         ctx.addIssue({
        //             code: z.ZodIssueCode.custom,
        //             message: "Introduce un número válido",
        //         });
        //         return z.NEVER;
        //     }
        //     if (parsed <= 0) {
        //         ctx.addIssue({
        //             code: z.ZodIssueCode.custom,
        //             message: "El importe debe ser mayor a 0",
        //         });
        //         return z.NEVER;
        //     }
        //     if (parsed > isMaxToSpend) {
        //         ctx.addIssue({
        //             code: z.ZodIssueCode.custom,
        //             message: `El gasto no puede exceder ${isMaxToSpend.toFixed(
        //                 2
        //             )} €`,
        //         });
        //         return z.NEVER;
        //     }
        //     return parsed;
        // }),
        icon: z.string().min(1, "Selecciona un icono"),
        type: z
            .string()
            .min(1, "Selecciona un tipo de categoría")
            .refine(
                (val) =>
                    ["Gasto Fijo", "Gasto Ocio", "Imprevistos"].includes(val),
                { message: "Selecciona un tipo de categoría válido" }
            ),
    });
