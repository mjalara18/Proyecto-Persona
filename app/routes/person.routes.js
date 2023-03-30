module.exports = app => {
    const persons = require("../controllers/person.controller.js");
    var router = require("express").Router();
  
    router.post("/", persons.create);
  
    router.get("/", persons.findAll); // http://localhost:1234/api/persons si lo dejas así con un get, el te va a buscar esta ruta, porque lo estás especificando
    router.get("/findAll", persons.findAll); // http://localhost:1234/api/persons/finAdll si te das cuenta agregué una ruta que va a buscar tambien el findAll y es un get, pero con un nombre diferente. 

    router.get("/:id", persons.findOne);

    router.delete("/:id", persons.delete);

    router.delete("/", persons.deleteAll);

    app.use('/api/persons', router);

  };

