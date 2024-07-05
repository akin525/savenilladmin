module.exports = (sequelize, Sequelize) => {
    return sequelize.define("messes", {

        message: {
            type: Sequelize
        },
        status: {
            type: Sequelize
        },


    });
};
