module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {

    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    wallet: {
      type: Sequelize.STRING
    },
    bank: {
      type: Sequelize.STRING
    },
    bank1: {
      type: Sequelize.STRING
    },
    account_number: {
      type: Sequelize.STRING
    },
    account_number1: {
      type: Sequelize.STRING
    },
    account_name: {
      type: Sequelize.STRING
    },
    account_name1: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.STRING
    },
    apikey: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    pin: {
      type: Sequelize.STRING
    },
    is_verify: {
      type: Sequelize.STRING
    },
    point: {
      type: Sequelize.STRING
    },
    cashback: {
      type: Sequelize.STRING
    },
    reward: {
      type: Sequelize.STRING
    },

  });
};
