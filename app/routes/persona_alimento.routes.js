module.exports = app => {
    const personsFoods = require("../controllers/persona_alimento.controller.js");
    var router = require("express").Router();
  
    router.post("/", personsFoods.create);
  
    router.get("/", personsFoods.findAll);

    router.get("/:id", personsFoods.findOne);

    router.put("/:id", personsFoods.update);

    router.delete("/:id", personsFoods.delete);

    router.delete("/", personsFoods.deleteAll);

    app.use('/api/personsFoods', router);

  };