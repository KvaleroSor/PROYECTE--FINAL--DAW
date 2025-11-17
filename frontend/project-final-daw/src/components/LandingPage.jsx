import Image from "next/image";

const LandingPage = () => {
    return (
        <>
            <div className="h-full w-full grid grid-cols-2 ">
                <div className="container_left-landing-page h-full w-full flex flex-col justify-center items-center border-2">
                    <div className="w-[800px] h-[1800] flex flex-col gap-10 flex justify-center items-center border-4">
                        <div className="title w-full h-[200px] text-[4rem] flex justify-start">
                            <h3>Expenses Control</h3>
                        </div>

                        <div className="eslogan w-full h-auto flex justify-start">
                            <h1 className="text-[6rem]">
                                Controla tus gastos de forma sencilla
                            </h1>
                        </div>
                        <div className="parragraph w-full h-auto flex justify-start">
                            <p className="text-[2rem]">Una interfaz minimalista hecha para ti.</p>
                        </div>
                        <div className="image w-full h-auto flex justify-start">
                            <Image
                                src={"/assets/image_landing-page.png"}
                                alt="Gráfico pastel"
                                width={600}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
                <div className="container_right-landing-page--login h-full w-full flex justify-center items-center border-2">
                    <h1>Login para la web</h1>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
