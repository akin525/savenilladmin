const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const bill= db.bill;
const deposit=db.deposit;
exports.purchase =  async (req, res) => {
    const userid = req.userId;
    try {
        let authorities = [];

        const user = await User.findOne({
            where: {
                id: userid,
                role:"admin",
            },
        });


        if (!user) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "Kindly login your account."});
        }
        const today1 = new Date().toISOString().split('T')[0];
        // const dateOnly = today.toISOString().split('T')[0];
        const  yesterday= new Date(new Date().setDate(new Date().getDate() - 1));
        const yesterdayInYMD = yesterday.toISOString().slice(0,10);

        const allbill =await bill.findAll();
        const sumallbill=await  bill.sum('amount');
        const countallbill=await bill.count();
        const counttoday= await bill.count({
            where: {
                date: {
                    [Op.like]: `%${today1}%`,
                },
            },
        });
        const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
        const twoDaysAgoInYMD = twoDaysAgo.toISOString().slice(0,10);

        const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3));
        const threeDaysAgoInYMD = threeDaysAgo.toISOString().slice(0,10);

        const fourDaysAgo = new Date(new Date().setDate(new Date().getDate() - 4));
        const fourDaysAgoInYMD = fourDaysAgo.toISOString().slice(0,10);

        const aweek = new Date(new Date().setDate(new Date().getDate() - 6));
        const aweekAgoInYMD = aweek.toISOString().slice(0,10);
        const todaybill=await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${today1}%`,
                },
            },
        });
        const twodaybill = await bill.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${twoDaysAgoInYMD}%`,
                },
            },
        });
        const threedaybill = await bill.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${threeDaysAgoInYMD}%`,
                },
            },
        });
        const fourdaybill = await bill.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${fourDaysAgoInYMD}%`,
                },
            },
        });
        const aweekbill = await bill.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${aweekAgoInYMD}%`,
                },
            },
        });
        const yesterdaybill = await bill.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${yesterdayInYMD}%`,
                },
            },
        });
        return res.status(200).send({
            all:allbill,
            sumbill:sumallbill,
            todaybill:todaybill??0,
            yesterdaybill:yesterdaybill??0,
            twodaybill:twodaybill??0,
            threedaybill:threedaybill??0,
            fourdaybill:fourdaybill??0,
            aweekbill:aweekbill??0,
        });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};

exports.pending =  async (req, res) => {
    const userid = req.userId;
    try {
        let authorities = [];

        const user = await User.findOne({
            where: {
                id: userid,
                role:"admin",
            },
        });


        if (!user) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "Kindly login your account."});
        }

        const allbill =await bill.findAll({
            where: {
                result: 0,

            },
        });

        return res.status(200).send({
            all:allbill,
        });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};

exports.getpurchases =  async (req, res) => {

    try {


        const alldepo =await bill.findOne({
            where: {
                id: req.body.id,
            },
        });


        return res.status(200).send({
            bill:alldepo,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }


};
exports.searchpurchases =  async (req, res) => {

    try {


        const alldepo =await bill.findOne({
            where: {
                refid:req.body.refid,
            },
        });
        // const alldepo =await bill.findOne({
        //     where: {
        //         refid: {
        //             [Op.like]: `%${req.body.refid}%`,
        //         },
        //     },
        // });


        return res.status(200).send({
            bill:alldepo,
            samson:"hello av updated",
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }


};
