const db = require("../models");
const request = require("request");
const User = db.user;
const bill= db.bill;


exports.fund =  async (req, res) => {


    try {


        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "User not found",});
        }
        const cr=parseInt(user.wallet)+parseInt(req.body.amount);

        const user1 = await User.update(
            { wallet: cr },
            {
                where: {
                    username:user.username,
                },

            });
        const dep= await bill.findOne({
            where:{
                id:req.body.id,
            },
        });
        const cr1=1;

        const dep1 = await bill.update(
            { result: cr1 },
            {
                where: {
                    id:dep.id,
                },

            });
        return res.status(200).send({
            status:"1",
            message:"Reverser Successful",
            userdetail:user,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
