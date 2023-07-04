const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const deposit=db.deposit;
const bill= db.bill;
const charge=db.charges;
const lock=db.safelock;
exports.Debit =  async (req, res) => {
    const userid = req.userId;
    try {
        let authorities = [];

        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "User not found",});
        }
        if (req.body.amount =="") {
            return res.status(200).send({status:"0", message: "Please enter amount"});
        }
        if (req.body.amount =="0") {
            return res.status(200).send({status:"0", message: "Please enter amount above 0"});
        }
        const dep= await charge.findOne({
            where:{
                payment_ref:req.body.refid,
            },
        });
        if (dep)
        {
            return res.status(200).send({
                status: "0",
                message: "duplicate transaction"
            });
        }
        const dr=parseInt(user.wallet)-parseInt(req.body.amount);
        const insert=await charge.create({
            username:req.body.username,
            amount:req.body.amount,
            payment_ref:req.body.refid,
            iwallet:user.wallet,
            fwallet:dr,
            description:"amount being charge by admin",
        });

        const user1 = await User.update(
            { wallet: dr },
            {
                where: {
                  username:user.username,
                },

            });
        return res.status(200).send({
            status:"1",
            message:"User Charge Successfully",
       userdetail:user,
            in:insert,
            po:user1,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};