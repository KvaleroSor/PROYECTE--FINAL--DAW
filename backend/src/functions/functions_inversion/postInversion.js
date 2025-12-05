import Inversion from './../../models/inversion.js';

const postInversion = async (newInversion) => {
    try{
        const { user_id, type, amount, inversion_date, target_profitability, real_profitability, total } = newInversion;
        
        const registerInversion = await Inversion.create({
            user_id: user_id,
            type: type,
            amount: amount,
            inversion_date: inversion_date,
            target_profitability: target_profitability,
            real_profitability: real_profitability,
            total: total
        });
    
        return registerInversion;
    }catch(err){
        console.error(err);
        console.log("❌ ERROR - THE INVERSION HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postInversion;