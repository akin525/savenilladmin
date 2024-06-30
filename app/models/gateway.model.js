module.exports = (sequelize, Sequelize) => {

    const gateway=sequelize.define("gateway", {

        method: {
            type: Sequelize
        },
        token: {
            type: Sequelize
        },
        amount: {
            type: Sequelize
        },
        tamount: {
            type: Sequelize
        },
    });
    return gateway;
};
