import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Balance.app API",
            version: "1.0.0",
            description:
                "API REST para gestionar las finanzas personales. Permite crear categorías, registrar gastos, metas de ahorro e inversiones.",
            contact: {
                name: "Kike Valero",
                email: "kike@balance.app",
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT",
            },
        },
        servers: [
            {
                url: "http://localhost:3003",
                description: "Servidor de desarrollo",
            },
            {
                url: "https://proyecte-final-daw.onrender.com",
                description: "Servidor de producción",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Token JWT obtenido al hacer login",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    required: ["name", "email", "password_hash"],
                    properties: {
                        _id: {
                            type: "string",
                            description:
                                "ID del usuario (generado por MongoDB)",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            description: "Nombre completo",
                            example: "Juan Pérez",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email (usado para login)",
                            example: "juan@example.com",
                        },
                        nomina: {
                            type: "number",
                            description: "Sueldo mensual en euros",
                            example: 2000,
                        },
                        percentageSpend: {
                            type: "object",
                            properties: {
                                fixedExpenses: { type: "number", example: 40 },
                                leisureExpenses: {
                                    type: "number",
                                    example: 20,
                                },
                                investment: { type: "number", example: 10 },
                                savings: { type: "number", example: 30 },
                            },
                        },
                        theme: {
                            type: "string",
                            enum: ["light", "dark"],
                            example: "dark",
                        },
                        language: {
                            type: "string",
                            enum: ["es", "en", "ca"],
                            example: "es",
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            default: "user",
                        },
                    },
                },
                Category: {
                    type: "object",
                    required: ["name", "categoryType", "budget", "user_id"],
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "Supermercado",
                        },
                        categoryType: {
                            type: "string",
                            enum: ["fixed", "leisure"],
                            example: "fixed",
                        },
                        budget: {
                            type: "number",
                            example: 300,
                        },
                        user_id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                    },
                },
                Spend: {
                    type: "object",
                    required: [
                        "name",
                        "amount",
                        "date",
                        "category_id",
                        "user_id",
                    ],
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "Compra Mercadona",
                        },
                        amount: {
                            type: "number",
                            example: 45.5,
                        },
                        date: {
                            type: "string",
                            format: "date",
                            example: "2026-05-15",
                        },
                        category_id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        user_id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                    },
                },
                SavingGoal: {
                    type: "object",
                    required: ["name", "targetAmount", "priority", "user_id"],
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "Vacaciones",
                        },
                        targetAmount: {
                            type: "number",
                            example: 2000,
                        },
                        currentAmount: {
                            type: "number",
                            example: 500,
                        },
                        priority: {
                            type: "number",
                            minimum: 1,
                            maximum: 10,
                            example: 8,
                        },
                        deadline: {
                            type: "string",
                            format: "date",
                            example: "2026-12-31",
                        },
                        user_id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                    },
                },
                Investment: {
                    type: "object",
                    required: ["name", "amount", "type", "user_id"],
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                        name: {
                            type: "string",
                            example: "Apple Inc.",
                        },
                        amount: {
                            type: "number",
                            example: 1000,
                        },
                        type: {
                            type: "string",
                            enum: ["stocks", "crypto", "bonds", "funds"],
                            example: "stocks",
                        },
                        purchaseDate: {
                            type: "string",
                            format: "date",
                            example: "2026-01-15",
                        },
                        currentValue: {
                            type: "number",
                            example: 1150,
                        },
                        user_id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        mensaje: {
                            type: "string",
                            example: "❌ ERROR - Descripción del error",
                        },
                    },
                },
                Success: {
                    type: "object",
                    properties: {
                        mensaje: {
                            type: "string",
                            example: "✅ ÉXITO - Operación completada",
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/**/*.js"], // Archivos que contienen anotaciones JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);
