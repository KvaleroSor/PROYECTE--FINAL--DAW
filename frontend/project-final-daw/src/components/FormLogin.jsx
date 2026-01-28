import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, loginSchema } from '@validations/validationsFormsLogin'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonLogin from "./Button.jsx";
import PercentageSelector, { BUDGET_PRESETS } from "./PercentageSelector.jsx";
import { SquareUser, Mail, Lock, Eye, EyeOff, Euro, Check } from "lucide-react";
import AlertMessage from "./AlertMessage.jsx";

const FormLogin = () => {
    const [isName, setIsName] = useState("");
    const [isNomina, setIsNomina] = useState("");
    const [isSpendingPercentage, setIsSpendingPercentage] = useState("");
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isPasswordConfirm, setIsPasswordConfirm] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isError, setIsError] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);

    const { data: session, status } = useSession();
    const router = useRouter();

    const schema = isLoginMode ? loginSchema : registerSchema;

    const { register, handleSubmit, formState: { errors, touchedFields }, reset } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur"
    })

    console.log("Errores de validación:", errors);

    useEffect(() => {
        if (status === "authenticated" && session) {
            router.push("/dashboard");
        }
    }, [session, status]);

    useEffect(() => {
        reset(undefined, { keepValues: false, keepErrors: false });
    }, [isLoginMode, reset]);

    const handleCleanUpValuesForm = () => {
        setIsName("");
        setIsEmail("");
        setIsPassword("");
        setIsPasswordConfirm("");
        setIsNomina("");
        setIsSpendingPercentage("");
        setIsError("");
    };

    const handleSubmitForm = async (data) => {
        // e.preventDefault();
        console.log("Datos del formulario:", data);

        if (!isLoginMode) {
            const budgedPreset = BUDGET_PRESETS.find(
                (p) => p.id === isSpendingPercentage
            );
            const distributionSpendPercentage = budgedPreset?.distribution;
            const nameSpendPercentage = budgedPreset?.name;

            const dataNewUser = {
                name: data.name,
                email: data.email,
                password_hash: data.password,
                nomina: data.nomina,
                percentageSpend: {
                    namePercentageSpend: nameSpendPercentage,
                    fixedExpenses: distributionSpendPercentage.fixedExpenses,
                    leisureExpenses:
                        distributionSpendPercentage.leisureExpenses,
                    investment: distributionSpendPercentage.investment,
                    savings: distributionSpendPercentage.savings,
                },
            };

            if (data.password !== data.confirmPassword) {
                setIsError("❌ | LAS CONTRASEÑAS NO COINCIDEN");
                return;
            }

            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataNewUser),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log("✅ - USER CREATED SUCCESFULLY: ", result);
                    handleCleanUpValuesForm();
                    setIsLoginMode(true);
                } else {
                    console.log("Error del servidor:", result);
                    let errorMessage = result.mensaje;

                    if (result.error) {
                        try {
                            const parsed = JSON.parse(result.error);
                            errorMessage = parsed.error || parsed.mensaje || result.mensaje;
                        } catch {
                            errorMessage = result.error;
                        }
                    }
                    setIsError(errorMessage);
                }
            } catch (error) {
                console.error("❌ ERROR - CONNECTION ERROR");
                setIsError(`❌ ERROR - CONNECTION ERROR`);
            }
        } else {
            //ESTEM NO MODO LOGIN

            console.log("🧾 EMAIL QUE LLEGA AL LOGIN: ", isEmail);
            console.log("🔏 PASSWORD QUE LLEGA AL LOGIN: ", isPassword);

            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            console.log(res);

            if (res.error) {
                setIsError("CREDENCIALES INCORRECTAS");
            }
        }
    };

    return (
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-2">
                <label htmlFor="email" className="text-gray-700 dark:text-slate-300 text-xl">
                    Correo Electrónico
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-slate-400" />
                    <input
                        id="email"
                        type="email"
                        placeholder="emial@email.com"
                        {...register("email")}
                        className={`w-full pl-11 h-11 sm:h-12 bg-gray-50 dark:bg-slate-700 border ${!isLoginMode && errors.email && 'border-red-400 dark:border-red-400'} rounded-xl focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 focus:ring-0 transition-colors text-base outline-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                        required
                    />
                    {touchedFields.email && !errors.email && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />}
                </div>
                {touchedFields.email && errors.email && <AlertMessage message={errors.email.message} type="error" />}
            </div>
            {/* {errors.email && <AlertMessage message={errors.email.message} type="error" />} */}
            <div className="space-y-2">
                <label htmlFor="password" className="text-gray-700 dark:text-slate-300 text-xl">
                    Contraseña
                </label>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-slate-400" />
                    <input
                        id="password"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password")}
                        className={`w-full pl-11 pr-11 h-11 sm:h-12 bg-gray-50 dark:bg-slate-700 border ${!isLoginMode && errors.password && 'border-red-400 dark:border-red-400'} rounded-xl focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors text-base outline-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                    >
                        {isShowPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-700 dark:text-slate-400" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-700 dark:text-slate-400" />
                        )}
                    </button>
                </div>
                {touchedFields.password && errors.password && <AlertMessage message={errors.password.message} type="error" />}
            </div>

            {!isLoginMode && (
                <>
                    <div className="space-y-2">
                        <label
                            htmlFor="passwordConfirm"
                            className="text-gray-700 dark:text-slate-300 text-xl"
                        >
                            Confirmación Contraseña
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-slate-400" />
                            <input
                                id="passwordConfirm"
                                type={isShowPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                className={`w-full pl-11 pr-11 h-11 sm:h-12 bg-gray-50 dark:bg-slate-700 border ${!isLoginMode && errors.password && 'border-red-400 dark:border-red-400'} rounded-xl focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors text-base outline-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsShowPassword(!isShowPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {isShowPassword ? (
                                    <EyeOff className="w-5 h-5 text-gray-700 dark:text-slate-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-700 dark:text-slate-400" />
                                )}
                            </button>
                        </div>
                        {touchedFields.confirmPassword && errors.confirmPassword && <AlertMessage message={errors.confirmPassword.message} type="error" />}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-gray-700 dark:text-slate-300 text-xl">
                            Nombre completo
                        </label>
                        <div className="relative">
                            <SquareUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-slate-400" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Balance.app"
                                {...register("name")}
                                className={`w-full pl-11 h-11 sm:h-12 bg-gray-50 dark:bg-slate-700 border ${!isLoginMode && errors.name && 'border-red-400 dark:border-red-400'} rounded-xl focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors text-base outline-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                                required
                            />
                        </div>
                        {touchedFields.name && errors.name && <AlertMessage message={errors.name.message} type="error" />}
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="nomina"
                            className="text-gray-700 dark:text-slate-300 text-xl"
                        >
                            Nómina
                        </label>
                        <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-slate-400" />
                            <input
                                id="nomina"
                                type="text"
                                placeholder="2500.00€"
                                {...register("nomina", { valueAsNumber: true })}
                                className={`w-full pl-11 h-11 sm:h-12 bg-gray-50 dark:bg-slate-700 border ${!isLoginMode && errors.nomina && 'border-red-400 dark:border-red-400'} rounded-xl focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors text-base outline-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                                required
                            />
                        </div>
                        {touchedFields.nomina && errors.nomina && <AlertMessage message={errors.nomina.message} type="error" />}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="percentageSelector"
                            className="text-gray-700 dark:text-slate-300 text-xl"
                        >
                            Perfil de presupuesto
                        </label>
                        <div className="relative">
                            <PercentageSelector
                                value={isSpendingPercentage}
                                onChange={(valueId) => {
                                    setIsSpendingPercentage(valueId);
                                }}
                            />
                        </div>
                        <p className="text-md text-gray-500 dark:text-slate-400 mt-2">
                            Podrás personalizar estos valores después en tu
                            dashboard.
                        </p>
                        {isError && <AlertMessage message={isError} type="error" />}
                    </div>
                </>
            )}
            {isError && <AlertMessage message={isError} type="error" />}
            {!isLoginMode ? (
                <button
                    type="button"
                    className="underline underline-offset-4 transition-shadow duration-200 hover:shadow-xl text-slate-700 dark:text-slate-300"
                    onClick={() => {
                        setIsLoginMode(true);
                        handleCleanUpValuesForm();
                    }}
                >
                    <span>Ir a Iniciar Sesión</span>
                </button>
            ) : (
                <button
                    type="button"
                    className="underline underline-offset-4 transition-shadow duration-200 hover:shadow-xl text-slate-700 dark:text-slate-300"
                    onClick={() => {
                        setIsLoginMode(false);
                        handleCleanUpValuesForm();
                    }}
                >
                    <span>Ir a Crear Sesión</span>
                </button>
            )}

            <div className="flex flex-col justify-center items-center gap-4 mt-8 pt-4">
                {isLoginMode ? (
                    <ButtonLogin
                        onClick={() => {
                            setIsLoginMode(true);
                        }}
                        textButton={"Iniciar Sesión"}
                    />
                ) : (
                    <ButtonLogin
                        onClick={() => {
                            setIsLoginMode(false);
                        }}
                        textButton={"Crear Cuenta"}
                    />
                )}
            </div>
        </form>
    );
};

export default FormLogin;
