module.exports = (sequelize, Sequelize) => {

    return sequelize.define("profits", {

        username: {
            type: Sequelize
        },
        amount: {
            type: Sequelize
        },
        plan: {
            type: Sequelize
        },
    });
};
