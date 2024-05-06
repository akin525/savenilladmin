const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const deposit=db.deposit;
exports.alldeposit =  async (req, res) => {
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
        const today = new Date().toISOString().split('T')[0];
        // const dateOnly = today.toISOString().split('T')[0];
        const  yesterday= new Date(new Date().setDate(new Date().getDate() - 1));
        const yesterdayInYMD = yesterday.toISOString().slice(0,10);


        const alldepo =await deposit.findAll();
        const sundepo=await deposit.sum('amount');
        const todaydeposit=await deposit.sum('amount',{
            where:{
                date: {
                    [Op.like]: `%${today}%`,
                },
            },
        });
        const yesterdayDepo = await deposit.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${yesterdayInYMD}%`,
                },
            },
        });
        function getDate() {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            const yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = yyyy + '-' + mm + '-' + dd;
            return today;
        }

        const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
        const twoDaysAgoInYMD = twoDaysAgo.toISOString().slice(0,10);


        // const threeDaysAgo = new Date(Date.now() - (3 * 24 * 60 * 60 * 1000));
        const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3));
        const threeDaysAgoInYMD = threeDaysAgo.toISOString().slice(0,10);

        const fourDaysAgo = new Date(new Date().setDate(new Date().getDate() - 4));
        const fourDaysAgoInYMD = fourDaysAgo.toISOString().slice(0,10);

        const aweek = new Date(new Date().setDate(new Date().getDate() - 6));
        const aweekAgoInYMD = aweek.toISOString().slice(0,10);


        const twodayDepo = await deposit.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${twoDaysAgoInYMD}%`,
                },
            },
        });
        const threedayDepo = await deposit.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${threeDaysAgoInYMD}%`,
                },
            },
        });
        const fourdayDepo = await deposit.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${fourDaysAgoInYMD}%`,
                },
            },
        });
        const aweekDepo = await deposit.sum('amount', {
            where: {
                date: {
                    [Op.like]: `%${aweekAgoInYMD}%`,
                },
            },
        });

        console.log(threeDaysAgoInYMD);
        return res.status(200).send({
            deposit:alldepo,
            sumdepo:sundepo,
            todaydeposit:todaydeposit??0,
            yesterdayDepo:yesterdayDepo??0,
            twodayDepo:twodayDepo??0,
            threedayDepo:threedayDepo??0,
            fourdayDepo:fourdayDepo??0,
            aweekDepo:aweekDepo??0,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }

    res.status(200).send("User Content.");

};
exports.getdeposit =  async (req, res) => {
    const userid = req.userId;
    try {


        const alldepo =await deposit.findOne({
            where: {
                id: req.body.id,
            },
        });


        return res.status(200).send({
            deposit:alldepo,
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
    }


};
