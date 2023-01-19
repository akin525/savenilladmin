const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const deposit=db.deposit;
const bill= db.bill;
const charge=db.charges;
const lock=db.safelock;
exports.users =  async (req, res) => {
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
            return res.status(200).send({status: "0", message: "User not found",
                userdetail:"aaaaa",
                userdeposit:0,
                userbill:0,
                usercharge:0,
                safelock:0,
            });
        }

        const userlock=await lock.sum('balance', {
            where:{
                username:user.username,
            },
        });
        const userdeposyt=await deposit.sum('amount', {
            where:{
                username:user.username,
            },
        });
        const userbill=await bill.sum('amount', {
            where:{
                username:user.username,
            },
        }) ;
        const usercharge= await  charge.sum('amount', {
            where:{
                username:user.username,
            },
        });
        const alldeposit= await deposit.findAll({
            where:{
                username:user.username,
            },
            limit:10,
            order: [['id', 'DESC']]
        });

        const allbill= await bill.findAll({
            where:{
                username:user.username,
            },
            limit:10,
            order: [['id', 'DESC']]
        });

        return res.status(200).send({
       userdetail:user,
            userdeposit:userdeposyt??0,
            userbill:userbill??0,
            usercharge:usercharge??0,
            safelock:userlock??0,
            allbill:allbill,
            alldeposit:alldeposit,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};