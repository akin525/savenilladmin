const db = require("../models");
const User = db.user;
const bill= db.bill;
const data=db.data;
var request = require('request');
const {response} = require("express");
const {Op} = require("sequelize");

exports.month =  async (req, res) => {
    const userid = req.body.userId;
    const date= req.body.date;
    var boy;
    try {
        let authorities = [];
        // const user = await User.findOne({
        //     where: {
        //         id: userid,
        //         role: "admin",
        //     },
        // });
        // if (!user) {
            // req.session = null;
            // return res.status(200).send({status: "0", message: "You not register as admin."});
        // }

        const monthcuntdata=await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%data%`,
                },
            },
        });
        const monthsumdata= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%data%`,
                },
            },

        });

        const monthcuntairtime= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const monthsumtairtime= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                // plan:{
                //     [Op.like]: `%airtime%`,
                // },
            },
        })
        // console.log(allplan);
        return res.status(200).send({
            status:"1",
            datamc:monthcuntdata,
            datems:monthsumdata,
            airtimec:monthcuntairtime,
            airtimes:monthsumtairtime,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }

    res.status(200).send("User Content.");

};
