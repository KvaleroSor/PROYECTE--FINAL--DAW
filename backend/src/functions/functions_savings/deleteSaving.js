import SavingGoal from './../../models/savings.js';
import User from './../../models/users.js';

const deleteSaving = async (id, userId) => {
    try {
        // 1. Obtener la meta antes de eliminarla para saber cuánto tenía contribuido
        const savingGoal = await SavingGoal.findById(id);
        
        if (!savingGoal) {
            return null;
        }

        const totalContributed = savingGoal.total_contributed || 0;

        // 2. Eliminar la meta
        const resultDelete = await SavingGoal.findByIdAndDelete(id);

        // 3. Si había contribuciones, sumarlas al ahorroGeneral del usuario
        if (totalContributed > 0 && userId) {
            await User.findByIdAndUpdate(
                userId,
                { $inc: { ahorroGeneral: totalContributed } },
                { new: true }
            );
            console.log(`💰 Añadido ${totalContributed}€ al ahorroGeneral del usuario`);
        }

        return resultDelete;
    } catch (err) {
        console.log("❌ ERROR - THE SAVING GOAL HAS NOT BEEN DELETED | BBDD");
        throw err;
    }
};

export default deleteSaving;
