module.exports = (sequelize, Sequelize) => {
    return sequelize.define("deposits", {
        status: {
            type: Sequelize
        },
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
            type: Sequelize
        },
        narration: {
            type: Sequelize
        },
        date: {
            type: Sequelize
        },
    });
};
