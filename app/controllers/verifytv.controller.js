const db = require("../models");
const User = db.user;
const bill= db.bill;
const deposit=db.deposit;
const data=db.data;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.verifytv =  async (req, res) => {
    const userid = req.body.userId;

    var boy;
    try {

        var options = {
            'method': 'POST',
            'url': 'https://test.mcd.5starcompany.com.ng/api/reseller/validate',
            'headers': {
                'Authorization': 'MCDKEY_903sfjfi0ad833mk8537dhc03kbs120r0h9a'
            },
            formData: {
                'service': 'tv',
                'coded': req.body.network,
                'phone': req.body.number
            }
        };

        request(options, function (error, response) {
            if (error) console.log(error);
            var data=JSON.parse(response.body);
            console.log(data.message);
            if (data.success===1){
                console.log(data);

                return   res.status(200).send({
                    message:data.data,
                });
            } else if (data.success===0) {
              return   res.status(200).send({
                    success:false,
                    message: data
                });
            }
            res.status(200).send(response.body);

        });

        //

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }


};
