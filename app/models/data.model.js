module.exports = (sequelize, Sequelize) => {
    return sequelize.define("data", {
        plan_id: {
            type: Sequelize.STRING
        },
        network: {
            type: Sequelize.STRING
        },
        plan: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        tamount: {
            type: Sequelize.STRING
        },
        ramount: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
    });
};
