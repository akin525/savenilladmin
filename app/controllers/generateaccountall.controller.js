const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const product=db.data;
const bill= db.bill;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

const axios = require('axios');
// const User = require('./User'); // Make sure to import the User model from the correct path

exports.generateAccountall = async (req, res) => {
  try {
    const processResults = [];
    const td = await User.findAll();

    const user=td[0];
    // await Promise.all(users.map(async (user) => {
      try {
        const options = createApiOptions(user);

        request(options, function (error, response) {
          if (error) {
            console.error(error);
            processResults.push({
              success:false,
              message: error.message,
            });
            return;
          }

          const data1 = JSON.parse(response.body);
          console.log(data1.success);
          console.log(data1);
          if (data1.success === "true") { // Use boolean comparison instead of a string
            const objectToUpdate = {
              account_number2: data1.data.account_number,
              account_name2: data1.data.account_name,
              bank2: data1.data.provider,
            };

            // Find and update the user using async/await
            User.update(objectToUpdate, {
              where: { username: user.username },
              returning: true, // Return the updated user
            }).then(([updatedUser]) => {
              if (updatedUser) {
                processResults.push({
                  success: true,
                  message: 'Account Generate Successful',
                  server_res: data1,
                });
              }
            }).catch((updateError) => {
              console.error(updateError);
              processResults.push({
                success:false,
                message: updateError.message,
              });
            });
          } else {
            processResults.push({
              success:false,
              message: data1.message,
            });
          }
        });
      } catch (error) {
        console.error(error);
        processResults.push({
          success:false,
          message: error.message,
        });
      }
    // }));

  } catch (error) {
    console.error(error);
    return res.status(200).send({
      success:false,
      message: error.message,
    });
  }
};

function createApiOptions(user) {
  var options = {
    method: 'POST',
    url: 'https://api.paylony.com/api/v1/create_account',
    headers: {
      Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz',
    },
    formData: {
      "firstname": user.username,
      "lastname": user.name,
      "address": user.address,
      "gender": user.gender,
      "email": user.email,
      "phone": user.phone,
      "dob": user.dob,
      "provider": "gtb",
    }
  };
  return options;
}

exports.generateaccountone = async (req, res) => {
  // return res.status(200).send({
  //   success:true,
  //   message: req.body,
  // });

  // try {

    const users = await User.findOne({
      where: {
        username: req.body.username,
      },
    }); // Assuming productid is an array

    if (!users){
      return res.status(200).send({
        success:false,
        message: "username does not exit",
      });
    }

    // Use Promise.all to parallelize requests
    //   var options = createApiOptions(users);




    var options =  {
      'method': 'POST',
      'url': 'https://api.paylony.com/api/v1/create_account',
      'headers': {
        Authorization: 'Bearer sk_live_av30amcd3piinbfm48j0v8iv8sd5hm81rhqikjz'
      },
      formData:{
        "firstname": users.username,
        "lastname": users.name,
        "address": "Lagos Nigeria",
        "gender": "Male",
        "email": users.email,
        "phone": "07040237649",
        "dob": "1995-01-03",
        "provider": "netmfb"
      }
    };


    request(options, function (error, response) {
      if (error){
        return  res.status(200).send({
          success:false,
          message:error,
          res:response,
        });
      }
      const data = JSON.parse(response.body);
      console.log(data.success);
        console.log(data);
        if (data.success ===true) {
          const objectToUpdate = {
            account_number: data.data.account_number,
            account_name: data.data.account_name,
            bank1: data.data.provider,
          };
          User.findAll({where: {username: users.username}}).then((result) => {
            if (result) {
              result[0].set(objectToUpdate);
              result[0].save();
            }
          })

          return res.status(200).send({
            success:true,
            user: users.username,
            message: "Account Generated Successful",
            server_res: data
          });

        }else {
          return res.status(200).send({
            success:false,
            message: data,
          });
        }
      // res.status(200).send(response.body);

    });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(200).send({
  //     success:false,
  //     body:req.body.username,
  //     message: error.message,
  //   });
  //
  //   return res.status(200).send({
  //     status: '100',
  //     message: req.body,
  //   })
  // }

};
