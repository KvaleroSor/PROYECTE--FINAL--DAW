/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Todo lo relacionado con usuarios (registro, login, perfil...)
 *   - name: Categories
 *     description: Categorías de gastos (fijos y ocio)
 *   - name: Spends
 *     description: Registro y consulta de gastos
 *   - name: Savings
 *     description: Metas de ahorro con prioridades
 *   - name: Investments
 *     description: Inversiones (acciones, crypto, fondos...)
 *   - name: Admin
 *     description: Endpoints solo para administradores
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear cuenta
 *     description: Registra un nuevo usuario en la app
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: password123
 *               nomina:
 *                 type: number
 *                 example: 2000
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Faltan datos o el email ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Cambiar contraseña
 *     description: Actualiza la contraseña del usuario (requiere la actual para validar)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: newPassword456
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Contraseña actual incorrecta o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías del usuario
 *     description: Retorna todas las categorías creadas por el usuario autenticado
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Crear nueva categoría
 *     description: Crea una nueva categoría de gasto para el usuario
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryType
 *               - budget
 *             properties:
 *               name:
 *                 type: string
 *                 example: Supermercado
 *               categoryType:
 *                 type: string
 *                 enum: [fixed, leisure]
 *                 example: fixed
 *               budget:
 *                 type: number
 *                 example: 300
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/spends:
 *   get:
 *     summary: Obtener todos los gastos del usuario
 *     description: Retorna todos los gastos registrados por el usuario autenticado
 *     tags: [Spends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Spend'
 *   post:
 *     summary: Registrar nuevo gasto
 *     description: Crea un nuevo registro de gasto
 *     tags: [Spends]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - date
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Compra Mercadona
 *               amount:
 *                 type: number
 *                 example: 45.50
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-15
 *               category_id:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Gasto registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spend'
 */

/**
 * @swagger
 * /api/savings:
 *   get:
 *     summary: Obtener todas las metas de ahorro
 *     description: Retorna todas las metas de ahorro del usuario
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de metas de ahorro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SavingGoal'
 *   post:
 *     summary: Crear nueva meta de ahorro
 *     description: Crea una nueva meta de ahorro con prioridad
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - targetAmount
 *               - priority
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vacaciones
 *               targetAmount:
 *                 type: number
 *                 example: 2000
 *               priority:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 8
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *     responses:
 *       201:
 *         description: Meta de ahorro creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SavingGoal'
 */

/**
 * @swagger
 * /api/inversion:
 *   get:
 *     summary: Obtener todas las inversiones
 *     description: Retorna todas las inversiones del usuario
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de inversiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Investment'
 *   post:
 *     summary: Registrar nueva inversión
 *     description: Crea un nuevo registro de inversión
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple Inc.
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 enum: [stocks, crypto, bonds, funds]
 *                 example: stocks
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-15
 *     responses:
 *       201:
 *         description: Inversión registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investment'
 */
