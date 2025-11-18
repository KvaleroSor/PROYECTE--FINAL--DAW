import { ArrowRight } from "lucide-react";

const Button = ({ textButton }) => {
    return (
        <button
            type="submit"
            className="w-full h-11 sm:h-12 flex justify-center items-center bg-gradient-to-r from-[#19625C] via-[#1A8B84] to-[#00C7C7] hover:from-[#145047] hover:via-[#156F69] hover:to-[#00B0B0] text-white transition-all duration-300 group"
        >
            <span>{textButton}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
    );
};

export default Button;
