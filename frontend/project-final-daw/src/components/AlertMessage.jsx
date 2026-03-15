import { AlertTriangle } from "lucide-react";

const AlertMessage = ({ message, type }) => {
    return (
        <>
            < div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 mb-3" >
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-md text-red-600 dark:text-red-300 mb-1">{message}</p>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AlertMessage;