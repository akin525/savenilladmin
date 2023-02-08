const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const profits=db.profit;
const charges=db.charges;
const bill= db.bill;
const deposit=db.deposit;
const lock =db.safelock;
const no =db.message;



exports.dashboard =  async (req, res) => {
    const userid = req.userId;
    try {
        let authorities = [];

        const user = await User.findOne({
            where: {
                id: userid,
                role: "admin",
            },
        });
        if (!user) {
            // req.session = null;
            return res.status(200).send({status: "0", message: "You not register as admin."});
        }
        const allbill =await bill.findAll();
        const totalbill= await bill.sum('amount');
        const totaldeposit=await deposit.sum('amount', );

        const pendingtransaction =await bill.count({
            where:{
                result:"0",
            },
        });
        const date =new Date().toISOString().split('T')[0];

        const allusers=await User.count();
        const newusers=await User.count({
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },
        });
        const allwallet=await User.sum('wallet');
        const todaypurchase=await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },

            },
        })
        const todaydeposit=await deposit.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },

            },
        })


        const week = 1; // The week number you want to sum the amount for

        const dailyTotals = await bill.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${date}%`,
                },
            },
        });

        console.log(dailyTotals);


        const allock = await lock.sum('balance');
        const allcharges=await charges.sum('amount');
        const dataprofit=await profits.sum('amount');

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(today);
        yesterday.setDate(today - 1);

        console.log(yesterday);
        const yesterdayDepo = await deposit.sum('amount', {
            where: {
                createdAt:yesterday,
            },
        });
        console.log(yesterdayDepo);
        console.log(today);

        const noti=await no.findOne(
            {
                where:{
                    status:"1",
                },
            }
        );


        var request = require('request');
        var options = {
            'method': 'POST',
            'url': 'https://app2.mcd.5starcompany.com.ng/api/reseller/me',
            'headers': {
                'Authorization': 'mcd_key_yhij3dui0678iujk23hegwtfyu23dwky'
            },
            formData: {
                'service': 'balance'
            }
        };

        request(options, function (error, response) {
            // if (error) throw new Error(error);
            console.log(response.body);
            var data=JSON.parse(response.body);
            return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
               wallet: parseInt(allwallet),
                totalbill:totalbill??0,
                totaldeposit:totaldeposit??0,
                allock:allock??0,
                users:allusers,
                noti:noti.message,
                newusers:newusers,
                pendingtransaction:pendingtransaction,
                dataprofit:dataprofit??0,
                allcharges:allcharges??0,
                todaypurchase:todaypurchase??0,
                todaydeposit:todaydeposit??0,
                mcd:data.data.wallet,
            });
        });


    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    // res.status(200).send("User Content.");

};
