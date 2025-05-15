const db = require("../models");
var request = require('request');

exports.balance=  async (req, res) => {


    try {

        var options = {
            'method': 'GET',
            'url': 'https://api.paylony.com/api/v1/wallet_balance',
            'headers': {
                Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz'

            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body);
            const balance= data.data.balance;
            const pending= data.data.pending;


            console.log(data);
            return res.status(200).send({
                success:true,
                balance:balance,
                pending:pending
            });

        });





    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
exports.virtualacct=  async (req, res) => {


    try {

        var options = {
            'method': 'GET',
            'url': 'https://api.paylony.com/api/v1/fetch_all_accounts',
            'headers': {
                Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz'

            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body);
            const acct= data.data.data;


            console.log(data);
            return res.status(200).send({
                success:true,
                acct:acct
            });

        });





    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }
};
