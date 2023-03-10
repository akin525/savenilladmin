const { verifySignUp, authJwt} = require("../middleware");
const controller = require("../controllers/auth.controller");
const dashboard = require("../controllers/dashboard.controller");
const airtime = require("../controllers/airtime.controller");
const data = require("../controllers/data.controller");
const buydata = require("../controllers/buydata.controller");
const tv = require("../controllers/tv.controller");
const verifytv = require("../controllers/verifytv.controller");
const verifyelect = require("../controllers/verifyelect.controller");
const buytv = require("../controllers/buytv.controller");
const buyelect = require("../controllers/buyelect.controller");
const profile = require("../controllers/profile.controller");
const createlock = require("../controllers/safelock.controller");
const alldeposit = require("../controllers/deposit.controller");
const purchase = require("../controllers/purchase.controller");
const run = require("../controllers/run.controller");
const users=require("../controllers/users.controller");
const allusers=require("../controllers/alluser.controller");
const credit=require("../controllers/credit.controller");
const debit=require("../controllers/debit.controller");
const updte=require("../controllers/update.controller");
const find=require("../controllers/finduser.controller");
const product=require("../controllers/product.controller");
const swi=require("../controllers/switch.controller");
const noti=require("../controllers/updatenoti.controller");

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/noti", noti.Credit);
  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/dashboard",
      [authJwt.verifyToken],

      dashboard.dashboard);
  app.post("/api/auth/airtime", airtime.airtime);
  app.post("/api/auth/switch", swi.swit);
  app.post("/api/auth/buydata", buydata.buydata);
  app.post("/api/auth/tv", tv.tv);
  app.post("/api/auth/verifytv", verifytv.verifytv);
  app.post("/api/auth/verifyelect", verifyelect.verifyelect);
  app.post("/api/auth/buytv", buytv.buytv);
  app.post("/api/auth/buyelect", buyelect.buyelect);
  app.post("/api/auth/profile", profile.profile);
  app.post("/api/auth/run", run.run);
  app.post("/api/auth/credit", credit.Credit);
  app.post("/api/auth/debit", debit.Debit);
  app.post("/api/auth/update", updte.Updte);
  app.post("/api/auth/finduser", find.find);


  app.post("/api/auth/data", data.data);
      app.post("/api/auth/createlock", createlock.safelock);
      app.get("/api/auth/allock",[authJwt.verifyToken], createlock.safelock);
      app.get("/api/auth/product",[authJwt.verifyToken], product.product);
      app.post("/api/auth/users", users.users);
      app.get("/api/auth/alluser", allusers.allusers);
    app.get("/api/auth/purchase",
        [authJwt.verifyToken],
        purchase.purchase);
    app.get("/api/auth/alldeposit",
        [authJwt.verifyToken],
        alldeposit.alldeposit);
  app.post("/api/auth/signout", controller.signout);
};
