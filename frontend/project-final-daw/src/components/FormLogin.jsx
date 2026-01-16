import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonLogin from "./Button.jsx";
import PercentageSelector, { BUDGET_PRESETS } from "./PercentageSelector.jsx";
import { SquareUser, Mail, Lock, Eye, EyeOff, Euro } from "lucide-react";
// import postNewUser from "@/services/users/postNewUser.js";

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
    // const [budgetPreset, setBudgetPreset] = useState("");

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session) {
            router.push("/dashboard");
        }
    }, [session, status]);

    const handleCleanUpValuesForm = () => {
        setIsName("");
        setIsEmail("");
        setIsPassword("");
        setIsPasswordConfirm("");
        setIsNomina("");
        setIsSpendingPercentage("");
        setIsError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoginMode) {
            const budgedPreset = BUDGET_PRESETS.find(
                (p) => p.id === isSpendingPercentage
            );
            const distributionSpendPercentage = budgedPreset?.distribution;
            const nameSpendPercentage = budgedPreset?.name;

            const dataNewUser = {
                name: isName,
                email: isEmail,
                password_hash: isPassword,
                nomina: isNomina,
                percentageSpend: {
                    namePercentageSpend: nameSpendPercentage,
                    fixedExpenses: distributionSpendPercentage.fixedExpenses,
                    leisureExpenses:
                        distributionSpendPercentage.leisureExpenses,
                    investment: distributionSpendPercentage.investment,
                    savings: distributionSpendPercentage.savings,
                },
            };

            if (isPassword !== isPasswordConfirm) {
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
                    setIsLoginMode(true);
                } else {
                    setIsError(
                        `❌ ERROR - USER COULDN´T BEEN CREATED | ${result.mensaje}`
                    );
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
                email: isEmail,
                password: isPassword,
                redirect: false,
            });
            console.log(res);

            if (res.error) {
                setIsError("❌ | CREDENCIALES INCORRECTAS");
            }
        }

        handleCleanUpValuesForm();
    };

    return (
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <label htmlFor="email" className="text-gray-700 text-xl">
                    Correo Electrónico
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                    <input
                        id="email"
                        type="email"
                        placeholder="emial@email.com"
                        value={isEmail}
                        onChange={(e) => setIsEmail(e.target.value)}
                        className="w-full pl-11 h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-slate-900 focus:ring-0 transition-colors text-base outline-none focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="text-gray-700 text-xl">
                    Contraseña
                </label>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                    <input
                        id="password"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={isPassword}
                        onChange={(e) => setIsPassword(e.target.value)}
                        className="w-full pl-11 pr-11 h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-slate-900 transition-colors text-base outline-none focus:outline-none"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {isShowPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-700" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {!isLoginMode && (
                <>
                    <div className="space-y-2">
                        <label
                            htmlFor="passwordConfirm"
                            className="text-gray-700 text-xl"
                        >
                            Confirmación Contraseña
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                            <input
                                id="passwordConfirm"
                                type={isShowPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={isPasswordConfirm}
                                onChange={(e) =>
                                    setIsPasswordConfirm(e.target.value)
                                }
                                className="w-full pl-11 pr-11 h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-slate-900 transition-colors text-base outline-none focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsShowPassword(!isShowPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {isShowPassword ? (
                                    <EyeOff className="w-5 h-5 text-gray-700" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-gray-700 text-xl">
                            Nombre completo
                        </label>
                        <div className="relative">
                            <SquareUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Balance.app"
                                value={isName}
                                onChange={(e) => setIsName(e.target.value)}
                                className="w-full pl-11 h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-slate-900 transition-colors text-base outline-none focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="nomina"
                            className="text-gray-700 text-xl"
                        >
                            Nómina
                        </label>
                        <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                            <input
                                id="nomina"
                                type="text"
                                placeholder="2500.00€"
                                value={isNomina}
                                onChange={(e) => setIsNomina(e.target.value)}
                                className="w-full pl-11 h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-slate-900 transition-colors text-base outline-none focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="percentageSelector"
                            className="text-gray-700 text-xl"
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
                        <p className="text-md text-gray-500 mt-2">
                            Podrás personalizar estos valores después en tu
                            dashboard
                        </p>
                    </div>
                </>
            )}
            {!isLoginMode ? (
                <button
                    type="button"
                    className="underline underline-offset-4 transition-shadow duration-200 hover:shadow-xl"
                    onClick={() => {
                        setIsLoginMode(true);
                    }}
                >
                    <span>Ir a Iniciar Sesión</span>
                </button>
            ) : (
                <button
                    type="button"
                    className="underline underline-offset-4 transition-shadow duration-200 hover:shadow-xl"
                    onClick={() => {
                        setIsLoginMode(false);
                    }}
                >
                    <span>Ir a Crear Sesión</span>
                </button>
            )}
            {isError && <p style={{ color: "red" }}>{isError}</p>}
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
