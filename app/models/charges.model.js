module.exports = (sequelize, Sequelize) => {

    return sequelize.define("charps", {

        username: {
            type: Sequelize
        },
        payment_ref: {
            type: Sequelize
        },
        amount: {
            type: Sequelize
        },
        iwallet: {
            type: Sequelize
        },
        fwallet: {
            type: sequelize
        },
        description: {
            type: sequelize
        },

        status: {
            type: Sequelize
        },

    });
};
