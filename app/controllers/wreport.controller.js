const db = require("../models");
const User = db.user;
const bill= db.bill;
const data=db.data;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {Op} = require("sequelize");

exports.week =  async (req, res) => {
    // const userid = req.body.userId;
    const date= req.body.date;

    var boy;
    try {

        const weekcuntdata=await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
                    [Op.like]: `%data%`,
                },
            },
        });
        const weekcuntdeposit=await deposit.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },
        });

        const weeksumdeposit= await deposit.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },

        });
        const weeksumdata= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                refid:{
                    [Op.like]: `%data%`,
                },
            },

        });

        const weekcuntairtime= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const weeksumtairtime= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%airtime%`,
                },
            },
        })
        const weeksumtv= await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const weeksumtvc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%tv%`,
                },
            },
        })
        const weeksumelectc= await bill.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
                plan:{
                    [Op.like]: `%elect%`,
                },
            },
        })
        const weeksumelect= await bill.sum('amount',{
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
            datamc:weekcuntdata??0,
            tvc:weeksumtvc??0,
            tv:weeksumtv??0,
            elect:weeksumelect??0,
            electc:weeksumelectc??0,
            datems:weeksumdata??0,
            airtimec:weekcuntairtime??0,
            airtimes:weeksumtairtime??0,
            depositc:weekcuntdeposit,
            deposits:weeksumdeposit,
        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }

    res.status(200).send("User Content.");

};
