module.exports = (sequelize, Sequelize) => {
    return sequelize.define("messages", {

        message: {
            type: Sequelize
        },
        status: {
            type: Sequelize
        },


    });
};
