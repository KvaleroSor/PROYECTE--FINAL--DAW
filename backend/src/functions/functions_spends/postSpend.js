import Spend from './../../models/spends.js';

const postSpend = async (newSpend) => {
    try{
        const { user_id, categories, description, amount, date, payment_type = "Tarjeta" } = newSpend;
        
        const registerSpend = await Spend.create({
            user_id: user_id,
            categories: categories,
            description: description,
            amount: amount,
            date: date,
            payment_type: payment_type
        });
    
        return registerSpend;
    }catch(err){
        console.error(err);
        console.log("❌ ERROR - THE EXPENSE HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postSpend;