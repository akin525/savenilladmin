const db = require("../models");
const User = db.user;
const bill= db.bill;
const deposit=db.deposit;
const data=db.data;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.buyelect =  async (req, res) => {
    const userid = req.body.userId;

    var boy;
    try {
        let authorities = [];

        const user = await User.findOne({
            where: {
                id: userid,
            },
        });

        if (!user) {
            // req.session = null;
            return res.status(200).send({success:false, message: "Kindly login your account."});
        }

        const product= await data.findOne({
            where:{
                plan_id:req.body.id,
            },
        });
        const o=User.wallet < req.body.amount;
        console.log("user.wallet");
        console.log(user.wallet);
        console.log(req.body.amount);
        if (parseInt(user.wallet) < parseInt(req.body.amount))
        {
            return  res.status(200).send({
                status:"0",
                mu:o,
                se:req.body.amount,
                balance:user.wallet,
                message:"insufficient balance"
            });
        }

        const totalbill= await bill.findOne({
            where:{
                refid:req.body.refid,
            },
        });
        if (totalbill)
        {
            return res.status(200).send({
                success:false,
                message: "duplicate transaction"
            });
        }
        var allamount=user.wallet - req.body.amount;

        const user1 = await User.update(
            { wallet: allamount },
            {
                where: {
                    id: userid,
                },

            });
        // console.log("user1");
        // console.log(user1);

        const bil= await bill.create({
            username:user.username,
            plan:product.plan,
            amount:req.body.amount,
            server_res:"elect",
            result:"0",
            phone:req.body.number,
            refid:req.body.refid,
        });

        var options = {
            'method': 'POST',
            'url': 'https://test.mcd.5starcompany.com.ng/api/reseller/pay',
            'headers': {
                'Authorization': 'MCDKEY_903sfjfi0ad833mk8537dhc03kbs120r0h9a'
            },
            formData: {
                'service': 'electricity',
                'coded': product.plan_id,
                'phone': req.body.number,
                'amount': req.body.amount
            }
        };

        request(options, function (error, response) {
            if (error) console.log(error);
            var data=JSON.parse(response.body);
            console.log(data);
            if (data.success===1){
                console.log(data);
                const objectToUpdate = {
                    result:"1",
                    token: data.token
                }
                bill.findAll({ where: { id: bil.id}}).then((result) => {
                    if(result){
                        result[0].set(objectToUpdate);
                        result[0].save();
                    }
                })
                return   res.status(200).send({
                    success:true,
                    id:bil.id,
                    user:user.username,
                    message:req.body.id+" Token was Successfully generated: "+data.token,
                    server_res:response.body
                });
            } else if (data.success===0) {
                return   res.status(200).send({
                    success:false,
                    message: data.message
                });
            }
            res.status(200).send(response.body);

        });

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }


};
