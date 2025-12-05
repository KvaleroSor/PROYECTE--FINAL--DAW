import { ArrowRight } from "lucide-react";

const ButtonLogin = ({ onClick, textButton }) => {
    return (
        <button
            id={`${textButton}`}
            type="submit"
            className="w-full h-11 sm:h-12 flex justify-center items-center bg-white border-2 border-slate-900 hover:bg-slate-100 transition-all duration-300 rounded-xl"
            onClick={onClick}
        >
            <span>{textButton}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
    );
};

export default ButtonLogin;
