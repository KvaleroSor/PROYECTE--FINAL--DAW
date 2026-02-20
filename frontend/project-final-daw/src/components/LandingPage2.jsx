'use client';

import { BalanceLogoCircle } from "@/components/BalanceLogoCircle.jsx";
import { ChartPie, Target, Bell, Lock, Smartphone, TrendingUp } from "lucide-react";
import { useState } from "react";

const LandingPage2 = () => {
    // const [darkMode, setDarkMode] = useState(false);
    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
            <div className="w-full h-full grid grid-cols-1 grid-rows-[auto, auto, auto, auto]">
                <header className="w-full h-fit py-4">
                    <div className="w-full h-fit flex flex-row justify-around items-center gap-2">
                        <div className="flex flex-row justify-center items-center gap-2">
                            <BalanceLogoCircle className="w-10 h-10" />
                            <h1 className="text-3xl">Numoes.app</h1>
                        </div>
                        <nav className="flex flex-row justify-center items-center gap-4">
                            <ul className="flex flex-row justify-center items-center gap-4">
                                {/* <li><a href="">Caracteristicas</a></li> */}
                                <li><a href="">Pricing</a></li>
                                <li><a href="">Blog</a></li>
                                <li><a href="">Contacto</a></li>
                            </ul>
                        </nav>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <button className="border-2 border-transparent hover:border-slate-200 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all duration-200" onClick={() => setIsFormOpen(true)}>Iniciar Sesión</button>
                            <button className="w-fit h-fit px-4 py-2 bg-slate-800 text-slate-50 rounded-xl border-2 border-slate-800 hover:border-slate-300 transition-all duration-200" onClick={() => setIsFormOpen(true)}>Registrarse</button>
                        </div>
                    </div>
                </header>
                {/* Sección imagen */}
                <div className="w-full flex flex-col justify-center items-center gap-6 mt-20 pb-20 bg-gradient-to-b from-white via-white to-slate-100">
                    <div className="w-full mb-6">
                        <h1 className="text-7xl font-bold text-slate-800 text-center"><span className="block">Finanzas personales,</span><span className="block">simplificadas</span></h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <h4 className="text-xl text-slate-500">La forma más inteligente de gestionar tu dinero. Controla gastos, planifica</h4>
                        <h4 className="text-xl text-slate-500">ahorros y alcanza tus metas financieras.</h4>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4 my-6">
                        <button className="border-2 border-transparent hover:border-slate-200 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all duration-200">Comenzar gratis</button><button className="w-fit h-fit px-4 py-2 bg-slate-800 text-slate-50 rounded-xl border-2 border-slate-800 hover:border-slate-300 transition-all duration-200">Ver Características</button>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4 px-10">
                        <img src="./assets/landing_page_img.png" className="w-full max-w-7xl h-auto rounded-3xl shadow-2xl" />
                    </div>
                </div>
                {/* Sección Características */}
                <div className="w-full bg-slate-100 mb-20">
                    <div className="flex flex-col justify-center items-center pt-10 gap-4">
                        <h1 className=" text-3xl font-bold">Todo lo que necesitas</h1>
                        <p className="text-xl text-slate-500">Herramientas poderosas para tu bienestar financiero</p>
                    </div>
                    <div className="w-full flex justify-center px-10">
                        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 my-10">
                            <div className="w-[400] h-[auto] border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <ChartPie />
                                </div>
                                <h1 className="text-xl font-bold">Visualización Clásica</h1>
                                <p className="text-slate-500">Gráficos intuitivos que muestran hacia dónde va tu dinero</p>
                            </div>
                            <div className="w-[400] h-full border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <Target />
                                </div>
                                <h1 className="text-xl font-bold">Metas de Ahorro</h1>
                                <p className="text-slate-500">Define y alcanza tus objetivos financieros paso a paso</p>
                            </div>
                            <div className="w-[400] h-full border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <Bell />
                                </div>
                                <h1 className="text-xl font-bold">Alertas Inteligentes</h1>
                                <p className="text-slate-500">Notificaciones sobre gastos inusuales o límites alcanzados</p>
                            </div>
                            <div className="w-[400] h-full border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <Lock />
                                </div>
                                <h1 className="text-xl font-bold">100% Seguro</h1>
                                <p className="text-slate-500">Encriptación bancaria y autepticación de dos factores</p>
                            </div>
                            <div className="w-[400] h-full border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <Smartphone />
                                </div>
                                <h1 className="text-xl font-bold">Multiplataforma</h1>
                                <p className="text-slate-500">Accede desde web, iOS y Android sin problemas</p>
                            </div>
                            <div className="w-[400] h-full border-2 rounded-xl border-slate-200 flex flex-col justify-start items-start gap-2 p-4 bg-slate-50 shadow-xl hover:shadow-md transition-all duration-200">
                                <div className="flex justify-center items-center bg-slate-800 text-slate-50 w-14 h-14 border-2 p-2 rounded-xl">
                                    <TrendingUp />
                                </div>
                                <h1 className="text-xl font-bold">Analisis Automático</h1>
                                <p className="text-slate-500">Insights sobre tus patrones de gasto e ingreso</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </>
    );
}

export default LandingPage2;
