const Button = ({ textButton }) => {    
    return textButton === "Entrar" ? (
        <button
            type="button"
            className="h-[4rem] w-[25rem] border-2 text-[2rem] m-2 rounded-md bg-pastelGreen hover:scale-105 transition duration-200 ease-in-out font-light"
        >
            {textButton}
        </button>
    ) : (
        <button
            type="button"
            className="h-[4rem] w-[25rem] border-2 text-[2rem] m-2 rounded-md hover:scale-105 transition duration-200 ease-in-out font-light"
        >
            {textButton}
        </button>
    );
};

export default Button;
