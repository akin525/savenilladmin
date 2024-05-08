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
const report=require("../controllers/report.controller");
const wreport=require("../controllers/wreport.controller");
const dreport=require("../controllers/dreport.controller");
const pending=require("../controllers/purchase.controller");
const revers=require("../controllers/reverse.controller");
const success=require("../controllers/success.controller");
const reversrefid=require("../controllers/reverseid.controller");
const findpurchase=require("../controllers/findpu.controller");
const MCD=require("../controllers/mcd.controller");
const reprocess=require("../controllers/reprocess.controller");
const account2=require("../controllers/generateaccountall.controller");
const account3=require("../controllers/generateaccountall1.controller");
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

  app.get("/api/auth/newaccount", account2.generateAccountall);
  app.get("/api/auth/newacc", account3.generateAccountall);
  app.post("/api/auth/newacc1", account3.generateaccountone);
  app.post("/api/auth/newaccount1", account2.generateaccountone);
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/report", report.month);
  app.post("/api/auth/wreport", wreport.week);
  app.post("/api/auth/dreport", dreport.daily);
  app.post("/api/auth/noti", noti.Credit);
  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/dashboard",
      [authJwt.verifyToken],

      dashboard.dashboard);
  app.post("/api/auth/airtime", airtime.airtime);
  app.post("/api/auth/switch", swi.swit);
  app.post("/api/auth/updatepro", swi.updatepro);
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
  app.post("/api/auth/reverse", revers.fund);
  app.post("/api/auth/reverseid", reversrefid.fundback);
  app.post("/api/auth/findp", findpurchase.findpu);

  app.post("/api/auth/approve", success.mark);
  app.get("/api/auth/pending",[authJwt.verifyToken], pending.pending);


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
  app.post("/api/auth/signout", controller.signout)
  app.get("/api/auth/bank",  [authJwt.verifyToken], MCD.getbanks);
  app.post("/api/auth/verify", MCD.verifybank);
  app.post("/api/auth/with", MCD.vithdrawmcd);
  app.post("/api/auth/reprocess", reprocess.reprocess);
  app.post("/api/auth/mark", reprocess.marksuccess);
  app.post("/api/auth/findpurchase", purchase.getpurchases);
  app.post("/api/auth/searchpurchase", purchase.searchpurchases);

};
