const db = require("../models");
const User = db.user;
const bill= db.bill;
const data=db.data;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {Op} = require("sequelize");

exports.month =  async (req, res) => {
    // const userid = req.body.userId;
    const date= req.body.date;

    var boy;
    try {

        const monthcuntdata=await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
                    [Op.like]: `%data%`,
                },
            },
        });
        const monthcuntdepo=await deposit.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },
        });
        const monthsumdepo= await deposit.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },

            },

        });
        const monthsumdata= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
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
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const monthsumtv= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const monthsumtvc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const monthsumelectc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%elect%`,
                },
            },
        })
        const monthsumelect= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%elect%`,
                },
            },
        })
        // console.log(allplan);
        return res.status(200).send({
            status:"1",
            date:date,
            datamc:monthcuntdata??0,
            tvc:monthsumtvc??0,
            tv:monthsumtv??0,
            elect:monthsumelect??0,
            electc:monthsumelectc??0,
            datems:monthsumdata??0,
            airtimec:monthcuntairtime??0,
            airtimes:monthsumtairtime??0,
            depositc:monthcuntdepo??0,
            deposits:monthsumdepo??0,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }

    res.status(200).send("User Content.");

};
