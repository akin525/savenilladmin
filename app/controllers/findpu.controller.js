const db = require("../models");
const request = require("request");
const User = db.user;
const bill= db.bill;


exports.findpu =  async (req, res) => {


    try {


        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            // req.session = null;
            return res.status(200).send({success:false, message: "User not found",});
        }
        const depo=await bill.findOne({
            where: {
                refid: req.body.refid,
            },

        });

        if (!depo){
            return res.status(200).send({success: false, message: "transaction not found",});

        }


        return res.status(200).send({
            success:true,
            data:depo,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
