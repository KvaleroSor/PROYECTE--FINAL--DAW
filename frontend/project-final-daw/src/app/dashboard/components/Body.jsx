import { useSession } from "next-auth/react";

const Body = () => {
    return (
        <>
            <div className="border-2 grid grid-rows-[30%_20%_50%] ">
                <div className="w-full border-2 flex flex-col sm:flex-row">
                    <div className="w-full border-2 rounded-xl m-3 flex justify-center items-center">CAJA 1</div>
                    <div className="w-full border-2 rounded-xl m-3 flex justify-center items-center">CAJA 2</div>
                </div>
                <div className="border-2"></div>
                <div className="border-2"></div>
            </div>
        </>
    );
};

export default Body;
