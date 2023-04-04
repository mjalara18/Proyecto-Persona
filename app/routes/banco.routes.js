module.exports = app => {
    const banco = require("../controllers/banco.controllers.js");
    var router = require("express").Router();
  
    router.post("/", banco.create);
    router.post("/create", banco.create);

    router.get("/", banco.findAll);
    router.get("/findAll", banco.findAll);

    router.get("/:id", banco.findOne);
    router.get("/findOne/:id", banco.findOne);

    router.put("/:id", banco.update);
    router.put("/update/:id", banco.update);

    router.delete("/:id", banco.delete);
    router.delete("/delete/:id", banco.delete);

    router.delete("/", banco.deleteAll);
    router.delete("/deleteAll", banco.deleteAll);

    app.use('/api/banco', router);

  };