const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.bill=require("../models/bill.model.js")(sequelize, Sequelize);
db.safelock=require("../models/safelock.model.js")(sequelize, Sequelize);
db.data=require("../models/data.model.js")(sequelize, Sequelize);
db.deposit=require("../models/deposit.model.js")(sequelize, sequelize);
db.profit=require("../models/profit.model.js")(sequelize, sequelize);
db.settings=require("../models/settings.model.js")(sequelize, sequelize);
db.charges=require("../models/charges.model.js")(sequelize, sequelize);
db.message=require("../models/message.model.js")(sequelize, sequelize);
db.reverse=require("../models/reverse.model.js")(sequelize, sequelize);
// db.mcd=require("../models/mcd.model.js")(sequelize, sequelize);
db.gateway=require("../models/gateway.model.js")(sequelize, sequelize);
db.gmarket=require("../models/general")(sequelize, sequelize);
db.dataserver=require("../models/mcdserver.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
