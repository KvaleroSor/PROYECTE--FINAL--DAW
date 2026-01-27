import { AlertTriangle } from "lucide-react";

const AlertMessage = ({ message, type }) => {
    return (
        <>
            < div className="bg-white rounded-xl p-4 border-l-4 border-orange-500 shadow-sm" >
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">{message}</p>
                        {/* <p className="text-sm text-slate-600">{description}</p> */}
                    </div>
                </div>
            </div >
        </>
    );
};

export default AlertMessage;