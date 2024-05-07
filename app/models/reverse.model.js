const { DataTypes, Model } = require('sequelize');

class Reverse extends Model {}

module.exports = (sequelize) => {
    Reverse.init({
        username: {
            type: DataTypes.STRING
        },
        plan: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        refid: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        server_res: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Reverse'
    });

    return Reverse;
};
