module.exports = (sequelize, Sequelize) => {
    return sequelize.define("settings", {
        email: {
            type: Sequelize
        },
        charges: {
            type: Sequelize
        },

    });
};
