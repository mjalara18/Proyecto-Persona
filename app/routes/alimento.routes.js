module.exports = app => { 
    const foods = require("../controllers/food.controller.js");
    var router = require("express").Router();
  
    router.post("/", foods.create);
  
    router.get("/", foods.findAll);

    router.get("/:id", foods.findOne);

    router.put("/:id", foods.update);

    router.delete("/:id", foods.delete);

    router.delete("/", foods.deleteAll);

    app.use('/api/foods', router);

  };