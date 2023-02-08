const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const no=db.message;
exports.Credit =  async (req, res) => {
    try {
        let authorities = [];

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