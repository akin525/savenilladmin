const db = require("../models");
const User = db.user;
const bill= db.bill;
const data=db.data;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {Op} = require("sequelize");

exports.daily =  async (req, res) => {
    // const userid = req.body.userId;
    const date= req.body.date;

    var boy;
    try {

        const dailycuntdata=await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
                    [Op.like]: `%data%`,
                },
            },
        });
        const dailycuntdeposit=await deposit.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },
        });

        const dailysumdeposit= await deposit.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },

        });
        const dailysumdata= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
                    [Op.like]: `%data%`,
                },
            },

        });

        const dailycuntairtime= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const dailysumtairtime= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const dailysumtv= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const dailysumtvc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const dailysumelectc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%elect%`,
                },
            },
        })
        const dailysumelect= await bill.sum('amount',{
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
            datamc:dailycuntdata??0,
            tvc:dailysumtvc??0,
            tv:dailysumtv??0,
            elect:dailysumelect??0,
            electc:dailysumelectc??0,
            datems:dailysumdata??0,
            airtimec:dailycuntairtime??0,
            airtimes:dailysumtairtime??0,
            depositc:dailycuntdeposit,
            deposits:dailysumdeposit,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }

    res.status(200).send("User Content.");

};
