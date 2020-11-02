const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

module.exports = router;

router.get('/', function(req, res) {
    res.send('NaN Labs Developer Excercise.');
  });

router.post("/", controller.addCard);


router.use(controller.send404);