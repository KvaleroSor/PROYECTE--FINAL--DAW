"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import {
    Sparkles,
    Zap,
    Shield,
    Heart,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import Button from "./Button.jsx";

const LandingPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isError, setIsError] = useState("");

    // console.log(isEmail);
    // console.log(isPassword);

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email: isEmail,
            password: isPassword,
            redirect: false,
        });

        if (res.error) {
            setIsError("❌ | CREDENCIALES INCORRECTAS");
        }

        console.log(res);
        setIsEmail("");
        setIsPassword("");
        setIsError("");
    };

    // 🛑🚨 DIVIDIR EN DOS COMPONENTS - PART ESQUERRA I PART DRETA.

    return (        
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* //PART ESQUERRA */}
            <div className="w-1/2 flex justify-center items-center bg-background-slate p-14">
                <div className="w-full max-w-xl flex flex-col gap-8">
                    <h3 className="text-[4rem] font-light">
                        Tu App Favorita para Gestionar los Gastos
                    </h3>

                    <p className="text-[1.8rem] font-light">
                        Donde tus ideas cobran vida. Únete a nuestra comunidad y
                        descubre un mundo de posibilidades.
                        <br />
                        <br />
                        Una interfaz minimalista hecha para ti.
                    </p>

                    {/* 📝 Crear una feature per a que esta informació s´agafe amb un map ⬇️ */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-10 sm:mt-12">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <p className="text-xl mb-2 font-light">
                                Experiencia Única
                            </p>
                            <p className="text-lg font-light">
                                Diseñado para ofrecerte la mejor experiencia
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate shadow-lg hover:shadow-2xl ">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <p className="text-xl mb-2 font-light">
                                Rápido y Eficiente
                            </p>
                            <p className="text-lg font-light">
                                Accede a todo lo que necesitas en segundos
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <p className="text-xl mb-2 font-light">
                                Seguro y Confiable
                            </p>
                            <p className="text-lg font-light">
                                Tu información protegida en todo momento
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 " />
                            </div>
                            <p className="text-xl mb-2 font-light">
                                Hecho con Pasión
                            </p>
                            <p className="text-lg font-light">
                                Creado pensando en ti y tus necesidades
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-12 flex flex-wrap gap-6 sm:gap-8">
                        <FaInstagram className="text-2xl sm:text-3xl mb-1 text-gray-600 cursor-pointer hover:rotate-180 tranisition-transform duration-300" />
                        <FaFacebook className="text-2xl sm:text-3xl mb-1 text-gray-600 cursor-pointer hover:rotate-180 tranisition-transform duration-300" />
                        <FaXTwitter className="text-2xl sm:text-3xl mb-1 text-gray-600 cursor-pointer hover:rotate-180 tranisition-transform duration-300" />
                    </div>
                </div>
            </div>
            {/* //PART DRETA */}
            <div className="lg:w-1/2 bg-white flex flex-col items-center justify-center p-8 lg:p-16">
                <div className="max-w-lg w-full border border-slate-200 p-10 rounded-xl shadow-2xl">
                    <div className="mb-10">
                        <h1 className="text-6xl mb-2 text-gray-800 pb-2 font-light">
                            Balance.app
                        </h1>
                        <p className="text-xl text-gray-600">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </p>
                    </div>

                    <form
                        className="space-y-5 sm:space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-gray-700 text-xl"
                            >
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
                            <label
                                htmlFor="password"
                                className="text-gray-700 text-xl"
                            >
                                Contraseña
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                                <input
                                    id="password"
                                    type={isShowPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={isPassword}
                                    onChange={(e) =>
                                        setIsPassword(e.target.value)
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
                        {isError && <p style={{ color: "red" }}>{isError}</p>}
                        <div className="flex flex-col justify-center items-center gap-4 mt-4">
                            <Button textButton={"Iniciar Sesión"} />
                            <Button textButton={"Crear Cuenta"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        //     </div>
        // </div>
    );
};

export default LandingPage;
