const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const deposit=db.deposit;
const bill= db.bill;
const charge=db.charges;
const lock=db.safelock;
exports.Updte =  async (req, res) => {
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
        const objectToUpdate = {
            role:req.body.role,
            name:req.body.name,
            phone:req.body.number,
            address:req.body.address,
            dob:req.body.dob
        }

        User.findAll({ where: { id: user.id}}).then((result) => {
            if(result){
                result[0].set(objectToUpdate);
                result[0].save();
            }
        })
        return res.status(200).send({
            status:"1",
            message:"User Updated Successfully",

        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};