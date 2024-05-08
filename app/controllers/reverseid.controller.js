const db = require("../models");
const request = require("request");
const User = db.user;
const bill= db.bill;
const Reverse=db.reverse;

exports.fundback =  async (req, res) => {


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
        const depo=await bill.findOne({
            where: {
                refid: req.body.refid,
            },

        });

        if (!depo){
            return res.status(200).send({status: "0", message: "transaction not found",});

        }
        const check= await Reverse.findOne({
            where:{
                refid:depo.refid,
            },
        });
        if (check){
            return res.status(200).send({status: 0, message: "Transaction already reversed",});

        }
        const cr=parseInt(user.wallet)+parseInt(depo.amount);
        const user1 = await User.update(
            { wallet: cr },
            {
                where: {
                    username:user.username,
                },

            });


        const cr1="2";

        const dep1 = await bill.update(
            { result: cr1 },
            {
                where: {
                    id:depo.id,
                },

            });
        const sam=await Reverse.create({
            username:depo.username,
            plan:depo.plan,
            amount:depo.amount,
            server_res:depo.server_res,
            result:2,
            phone:depo.phone,
            refid:depo.refid,

        });

        return res.status(200).send({
            status:1,
            message:"Reverser Successful",
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
