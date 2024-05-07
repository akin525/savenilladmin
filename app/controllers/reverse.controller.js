const db = require("../models");
const request = require("request");
const User = db.user;
const bill= db.bill;
const Reverse=db.reverse;

exports.fund =  async (req, res) => {


    try {


        // const user = await User.findOne({
        //     where: {
        //         username: req.body.username,
        //     },
        // });

        // if (!user) {
        //     // req.session = null;
        //     return res.status(200).send({status: 0, message: "User not found",});
        // }
        // const cr=parseInt(user.wallet)+parseInt(req.body.amount);
        //
        // const user1 = await User.update(
        //     { wallet: cr },
        //     {
        //         where: {
        //             username:user.username,
        //         },
        //
        //     });
        const dep= await bill.findOne({
            where:{
                refid:req.body.refid,
            },
        });
        if (!dep){
            return res.status(200).send({status: "0", message: "transaction not found",});

        }
        const check= await Reverse.findOne({
            where:{
                refid:dep.refid,
            },
        });
        if (check){
            return res.status(200).send({status: 0, message: "Transaction already reversed",});

        }
        const cr1=1;

        const dep1 = await bill.update(
            { result: cr1 },
            {
                where: {
                    id:dep.id,
                },

            });

       await Reverse.create({
           username:dep.username,
           plan:dep.plan,
           amount:dep.amount,
           server_res:dep.server_res,
           result:2,
           phone:dep.phone,
           refid:dep.refid,
       });
        return res.status(200).send({
            status:"1",
            message:"Reverser Successful",
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
