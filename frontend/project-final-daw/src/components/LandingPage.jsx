"use client";
import Image from "next/image";
import Button from "./Button.jsx";

const LandingPage = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-baseBg">
            <div className="w-[95%] max-w-[1700px] h-auto bg-cardBg shadow-2xl rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-full flex justify-center items-center bg-baseVerdePastelBg p-14">
                        <div className="w-full max-w-[800px] flex flex-col gap-8">
                            <h3 className="text-[3rem] font-light">
                                Expenses Control
                            </h3>

                            <h1 className="text-[4rem] lg:text-[6rem] font-light leading-tight">
                                Controla tus gastos de forma sencilla
                            </h1>

                            <p className="text-[1.8rem] font-extralight">
                                Una interfaz minimalista hecha para ti.
                            </p>

                            <Image
                                src="/assets/image_landing-page.png"
                                alt="Gráfico pastel"
                                width={600}
                                height={500}
                                className="rounded-soft"
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center bg-baseBg p-14">
                        <form className="w-full max-w-[500px] bg-cardBg rounded-xl shadow-md p-10 flex flex-col gap-6">
                            <h1 className="text-[3rem] font-light text-center">
                                Inicio de sesión
                            </h1>

                            <div className="flex flex-col text-textSecondary">
                                <label className="text-[1.8rem] font-extralight">
                                    Email
                                </label>
                                <input className="h-[4rem] border border-borderSoft rounded-md bg-cardBg mt-2 px-3 text-[1.4rem] focus:border-pastelMint focus:ring-2 focus:ring-pastelMint outline-none" />
                            </div>

                            <div className="flex flex-col text-textSecondary">
                                <label className="text-[1.8rem] font-extralight">
                                    Contraseña
                                </label>
                                <input className="h-[4rem] border border-borderSoft rounded-md bg-cardBg mt-2 px-3 text-[1.4rem] focus:border-pastelMint focus:ring-2 focus:ring-pastelMint outline-none" />
                            </div>

                            <div className="flex flex-col justify-center items-center gap-4 mt-4">
                                <Button textButton="Entrar" />
                                <Button textButton="Crear Cuenta" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
