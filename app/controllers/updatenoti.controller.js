const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const no=db.message;
exports.Credit =  async (req, res) => {
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
         message:req.body.message,
        }
       no.findAll({ where: { status: "1"}}).then((result) => {
            if(result){
                result[0].set(objectToUpdate);
                result[0].save();
            }
        })

        return res.status(200).send({
            status:"1",
            message:"Notification Successfully Update" ,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};