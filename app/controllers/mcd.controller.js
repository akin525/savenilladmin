const db = require("../models");
const {Op} = require("sequelize");
const request = require("request");
const User = db.user;
const deposit=db.deposit;

exports.getbanks =  async (req, res) => {
    const userid = req.userId;

    try {


        var options = {
            'method': 'GET',
            'url': 'https://api.paystack.co/bank',
            'headers': {
                "Authorization": "Bearer sk_test_280c68e08f76233b476038f04d92896b4749eec3",
                "Cache-Control": "no-cache"
            },
        };
        request(options, function (error, response) {
            if (error) console.log(error);
            var data=JSON.parse(response.body);
            res.status(200).send(response.body);

        });


    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
exports.verifybank =  async (req, res) => {
    const userid = req.userId;

    try {

        var options = {
            method: 'GET',
            url: 'https://sandbox.monnify.com/api/v1/disbursements/account/validate',
            headers: {
                Authorization: ' Basic TUtfVEVTVF9LUFoyQjJUQ1hLOkJERkJZUUtRSEVHR1NCOFJFODI3VlRGODhYVEJQVDJN',
                'Cache-Control': 'no-cache'
            },
            qs: {
                accountNumber: req.body.number,
                bankCode: req.body.bank
            }
        };
        request(options, function (error, response) {
            if (error) console.log(error);
            var data=JSON.parse(response.body);
            console.log(data);
            res.status(200).send(data);

        });


    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
exports.vithdrawmcd =  async (req, res) => {
    const userid = req.userId;

    try {
        var options =
            {
                'method': 'POST',


                'url': 'https://reseller.mcd.5starcompany.com.ng/api/v1/make-withdrawal',
                'headers': {
                    'Authorization': 'Bearer ChBfBAKZXxBhVDM6Vta54LAjNHcpNSzAhUcgmxr274wUetwtgGbbOJ1Uv0HoQckSLK8o9VIs1YlUUzP6ONe7rpXY2W7hg2YlYxcO7fJOP8uUPe3SG8hVKUwbrkkgmX4piw2yipJbY6R1tK5MyIFZYn',
                    'Content-Type': 'application/json'
                },
                formData: {
                    'service': 'withdraw_commission',
                    'wallet': 'wallet',
                    'amount': req.body.amount,
                    'account_number': req.body.number,
                    'bank_code': req.body.code,
                    'bank': req.body.bank,
                    'ref':req.body.refid
                }
            };
        request(options, function (error, response) {
            if (error) console.log(error);
            var data=JSON.parse(response.body);
            res.status(200).send(response.body);

        });


    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};


