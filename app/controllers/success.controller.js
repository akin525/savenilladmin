const db = require("../models");
const User = db.user;
const deposit=db.deposit;

exports.mark=  async (req, res) => {


    try {


        const dep= await deposit.findOne({
            where:{
                id:req.body.id,
            },
        });

        if (!dep) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "Transaction not found",});
        }
        const cr=1;

        const user1 = await deposit.update(
            { status: cr },
            {
                where: {
                    id:dep.id,
                },

            });
        return res.status(200).send({
            status:"1",
            message:"Transaction Successful",
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
