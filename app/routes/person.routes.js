module.exports = app => {
    const persons = require("../controllers/person.controller.js");
    var router = require("express").Router();
  
    router.post("/", persons.create);
  
    router.get("/", persons.findAll);

    router.get("/:id", persons.findOne);

    router.delete("/:id", persons.delete);

    router.delete("/", persons.deleteAll);

    app.use('/api/persons', router);

  };

