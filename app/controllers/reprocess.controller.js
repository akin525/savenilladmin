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
  try {
    const processResults = [];

    for (const element of req.body.productid) {
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

        var options = {
          method: 'POST',
          url: 'https://test.mcd.5starcompany.com.ng/api/reseller/pay',
          headers: {
            'Authorization': 'MCDKEY_903sfjfi0ad833mk8537dhc03kbs120r0h9a',
          },
          formData: {
            'service': 'data',
            'coded': products[0].plan_id, // Assuming you want the first product's plan_id
            'phone': process.phone,
          },
        };

        try {
          const response = await request(options);

          // Check if the response is empty
          if (!response.body) {
            console.error("Response body is empty");
            return res.status(200).send({
              status: "0",
              message: "Empty response from the server",
            });
          }

          // Parse JSON only if the content type is JSON
          if (response.headers['content-type'] === 'application/json') {
            const data1 = JSON.parse(response.body);

            if (data1.success === 1) {
              processResults.push({
                status: "1",
                message: `${process.plan} Was Successfully Delivered To ${process.phone}`,
                server_res: response,
              });
            } else if (data1.success === 0) {
              processResults.push({
                status: "0",
                message: data1.message,
              });
            }
          } else {
            // Handle non-JSON response here if needed
            console.error("Response is not in JSON format");
            return res.status(200).send({
              status: "0",
              message: "Response is not in JSON format",
            });
          }
        } catch (error) {
          console.error(error);
          return res.status(200).send({
            status: "0",
            message: error.message,
          });
        }

      }
    }

    return res.status(200).send({
      status: "1",
      message: processResults,
    });

  } catch (error) {
    console.error(error);
    return res.status(200).send({
      status: "0",
      message: error.message,
    });
  }
};
exports. marksuccess=  async (req, res) => {
  try {
    for (const element of req.body) {
      const process = await bill.findOne({
        where: {
          id: element.productid,
        },
      });

      if (process) {
        // Update the 'result' field for the found 'Bill' record
        await bill.update(
            { result: "1" },
            {
              where: {
                id: process.id,
              },
            }
        );
      }
    }


  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "0",
      message: "Internal Server Error",
    });
  }

};
