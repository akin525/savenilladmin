const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const product=db.data;
const bill= db.bill;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.generateaccountall = async (req, res) => {



  const axios = require('axios');

  try {
    const processResults = [];

    const users = await User.findAll(); // Assuming productid is an array

    // Use Promise.all to parallelize requests
    await Promise.all(users.map(async (element) => {

      var options = {
        'method': 'POST',
        'url': 'https://api.paylony.com/api/v1/create_account',
        'headers': {
          Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz'
        },
        body: JSON.stringify({
          "firstname": element.username, // Assuming 'element.username' is a variable
          "lastname": element.name,
          "address": element.address,
          "gender": element.gender,
          "email": element.email,
          "phone": element.phone,
          "dob": element.dob,
          "provider": "safehaven"
        })
      };


        try {
          const response = await axios(options);
          const data1 = JSON.parse(response.data);

          if (data1.success === "true") {
            const objectToUpdate = {
              account_number: data1.data.account_number,
              account_name: data1.data.account_name,
              bank1: data1.data.provider,
            };
            User.findAll({ where: { username: element.username}}).then((result) => {
              if(result){
                result[0].set(objectToUpdate);
                result[0].save();
              }
            })
            processResults.push({
              status: '1',
              message: `Account Generate Successful`,
              server_res: response.data,
            });
          } else  {
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

exports.generateaccountone = async (req, res) => {
  // return res.status(200).send({
  //   status: '1',
  //   message: req.body,
  // });

  try {

    const users = await User.findOne({
      where: {
        username: req.body.username,
      },
    }); // Assuming productid is an array


    // Use Promise.all to parallelize requests
      var options = {
        'method': 'POST',
        'url': 'https://api.paylony.com/api/v1/create_account',
        'headers': {
          Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz'
        },
       formData:{
         "firstname": users.username,
         "lastname": users.name,
         "address": users.address,
         "gender": users.gender,
         "email": users.email,
         "phone": users.phone,
         "dob": users.dob,
         "provider": "safehaven"

       }
      };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      var data=JSON.parse(response.body);
      console.log(data.success);
      if (data.success=="true"){
        console.log(data);
        const objectToUpdate = {
          account_number: data.data.account_number,
          account_name: data.data.account_name,
          bank1: data.data.provider,
        };
        User.findAll({ where: { username: users.username}}).then((result) => {
          if(result){
            result[0].set(objectToUpdate);
            result[0].save();
          }
        })

        return   res.status(200).send({
          status: "1",
          user:users.username,
          message:"Account Generated Successful",
          server_res:response.body
        });
      } else  {
        return   res.status(200).send({
          status: "0",
          message: data
        });
      }
      // res.status(200).send(response.body);

    });
  } catch (error) {
    console.error(error);
    return res.status(200).send({
      status: '0',
      body:req.body.username,
      message: error.message,
    });
  }

};
