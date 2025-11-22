import { useSession } from "next-auth/react";
import FormSpend from "../spend/components/FormSpend.jsx";
import GridCategories from "../category/components/GridCategories.jsx";

const Body = () => {
    return (
        <>
            <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1">
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[55%] border-2 rounded-xl m-3 flex flex-col justify-center items-center gap-5">
                        <h1 className="text-3xl text-[#1A8B84]">CREAR CATEGORIA</h1>
                        <FormSpend />
                    </div>
                    <div className="basis-[45%] border-2 rounded-xl m-3 flex justify-center items-center">CAJA 2</div>
                </div>
                <div className="border-2 rounded-xl m-3 flex justify-center items-center">Carrusel de gastos mostrados por categorías</div>
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[60%] border-2 rounded-xl m-3 flex justify-center items-center">
                        <GridCategories />
                    </div>
                    <div className="basis-[40%] w-full border-2 rounded-xl m-3 flex justify-center items-center">CAJA 4</div>
                </div>
            </div>
        </>
    );
};

export default Body;
