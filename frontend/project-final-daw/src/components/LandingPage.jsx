"use client";

import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import {
    Sparkles,
    Zap,
    Shield,
    Heart,
} from "lucide-react";

import FormLogin from "./FormLogin.jsx";

const LandingPage = () => {


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
                            Numoes.app
                        </h1>
                        <p className="text-xl text-gray-600">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </p>
                    </div>
                    <FormLogin />
                </div>
            </div>
        </div>

    );
};

export default LandingPage;
