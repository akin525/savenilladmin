const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const profits=db.profit;
const charges=db.charges;
const bill= db.bill;
const deposit=db.deposit;
const lock =db.safelock;
const no =db.message;



exports.dashboard = async (req, res) => {
    const userId = req.userId;

    try {
        let mcdbalance = 0;
        let mcdcom = 0;

        const fetchMcBalance = async () => {
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://reseller.mcd.5starcompany.com.ng/api/v1/my-balance',
                    headers: {
                        Authorization: 'Bearer ChBfBAKZXxBhVDM6Vta54LAjNHcpNSzAhUcgmxr274wUetwtgGbbOJ1Uv0HoQckSLK8o9VIs1YlUUzP6ONe7rpXY2W7hg2YlYxcO7fJOP8uUPe3SG8hVKUwbrkkgmX4piw2yipJbY6R1tK5MyIFZYn',
                    },
                };

                const response = await axios.request(config);
                mcdbalance = response.data.data.wallet || 0;
                mcdcom = response.data.data.commission || 0;
            } catch (error) {
                console.error('Error fetching MC balance:', error.message);
                if (error.response) {
                    console.error('Response Data:', error.response.data);
                }
            }
        };

        // Check if user is an admin
        const user = await User.findOne({
            where: { id: userId, role: 'admin' },
        });

        if (!user) {
            return res.status(403).send({ success:false, message: 'You are not registered as an admin.' });
        }


        const [
            allbill,
            totalbill,
            totaldeposit,
            pendingTransaction,
            allusers,
            newusers,
            allwallet,
            todayPurchase,
            todayDeposit,
            allock,
            allCharges,
            dataProfit,
            notification
        ] = await Promise.all([
            bill.findAll(),
            bill.sum('amount'),
            deposit.sum('amount'),
            bill.count({ where: { result: '0' } }),
            User.count(),
            User.count({ where: { date: { [Op.like]: `%${new Date().toISOString().split('T')[0]}%` } } }),
            User.sum('wallet'),
            bill.sum('amount', { where: { date: { [Op.like]: `%${new Date().toISOString().split('T')[0]}%` } } }),
            deposit.sum('amount', { where: { date: { [Op.like]: `%${new Date().toISOString().split('T')[0]}%` } } }),
            lock.sum('balance'),
            charges.sum('amount'),
            profits.sum('amount'),
            no.findOne({ where: { success:true } }),
        ]);

        // Fetch MC balance
        await fetchMcBalance();

        // Send the response
        return res.status(200).send({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                wallet: parseInt(allwallet, 10) || 0,
                totalbill: totalbill || 0,
                totaldeposit: totaldeposit || 0,
                allock: allock || 0,
                users: allusers || 0,
                newusers: newusers || 0,
                pendingtransaction: pendingTransaction || 0,
                dataprofit: dataProfit || 0,
                allcharges: allCharges || 0,
                todaypurchase: todayPurchase || 0,
                todaydeposit: todayDeposit || 0,
                noti: notification ? notification.message : null,
                mcdbalance,
                mcdcom,
            }
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};