import { useSession } from "next-auth/react";

const Body = () => {
    return (
        <>
            <div className=" grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1">
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[55%] border-2 rounded-xl m-3 flex justify-center items-center">CAJA 1</div>
                    <div className="basis-[45%] border-2 rounded-xl m-3 flex justify-center items-center">CAJA 2</div>
                </div>
                <div className="border-2 rounded-xl m-3 flex justify-center items-center">Carrusel de gastos mostrados por categorías</div>
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[60%] border-2 rounded-xl m-3 flex justify-center items-center">CAJA 1</div>
                    <div className="basis-[40%] w-full border-2 rounded-xl m-3 flex justify-center items-center">CAJA 2</div>
                </div>
            </div>
        </>
    );
};

export default Body;
