const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const product=db.data;
const bill= db.bill;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.reprocess = async (req, res) => {




  const axios = require('axios');

  try {
    const processResults = [];

    const productIds = req.body.productid; // Assuming productid is an array

    // Use Promise.all to parallelize requests
    await Promise.all(productIds.map(async (element) => {
      const billRecords = await bill.findAll({
        where: {
          id: element,
        },
      });

      for (const process of billRecords) {
        const products = await product.findAll({
          where: {
            plan: process.plan,
          },
        });

        const options = {
          'method': 'POST',


          'url': 'https://integration.mcd.5starcompany.com.ng/api/reseller/pay',
          'headers': {
            'Authorization': 'mcd_key_yhij3dui0678iujk23hegwtfyu23dwky'
          },
          data: {
            service: 'data',
            coded: products[0].plan_id, // Assuming you want the first product's plan_id
            phone: process.phone,
          },
        };

        try {
          const response = await axios(options);
          const data1 = response.data;

          if (data1.success === 1) {
            processResults.push({
              status: '1',
              message: `${process.plan} Was Successfully Delivered To ${process.phone}`,
              server_res: response.data,
            });
          } else if (data1.success === 0) {
            processResults.push({
              status: '0',
              message: data1.message,
            });
          }
        } catch (error) {
          console.error(error);
          processResults.push({
            status: '0',
            message: error.message,
          });
        }
      }
    }));

    return res.status(200).send({
      status: '1',
      message: processResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).send({
      status: '0',
      message: error.message,
    });
  }

};
exports. marksuccess=  async (req, res) => {

  const processResults = [];

  try {
    for (const element of req.body.productid) {
      const process = await bill.findAll({
        where: {
          id: element,
        },
      });

      // Update the 'result' field for the found 'Bill' records
      for (const pro of process) {
        await bill.update(
            { result: "1" },
            {
              where: {
                id: pro.id, // Use 'pro.id' instead of 'process.id'
              },
            }
        );
        processResults.push({
          status: '1',
          message: `Product mark successful`,
        });
      }
    }
    return res.status(200).send({
      status: '1',
      message: processResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "0",
      message: error.message,
    });
  }
};
