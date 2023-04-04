const { banco } = require("../models");
const db = require("../models");
const Banco = db.banco;

exports.create = (req, res) => {

    //req como argumento de solicitud, puede tener cuerpo o parametros a los cuales podemos accceder por medio de "body" y "params"

    if (!req.body.name1) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    var estrato = 0

    if (req.body.fondos >=100000 && req.body.fondos <= 1000000){
          var estrato = 1
    } else if (req.body.fondos >=1000001 && req.body.fondos <= 2000000){
          var estrato = 2
    } else if (req.body.fondos >=2000001){
          var estrato = 3
    } else {
          var estrato = 0
    }
    
    const banco = new Banco({
      name1: req.body.name1,
      adress: req.body.adress,
      cell: req.body.cell,
      fondos: req.body.fondos,
      estrato: estrato,
      gerente: req.body.gerente
    });

    //banco que es la importación del modelo, el cual te va a dar las propiedades para poder hacer las operaciones de base de datos
    //tenemos el save, que viene siendo el guardado en la base de datos y luego (then) es decir, luego de que guarde, ejecutame cierta logica
    // la información que obtenemos en data, es el resultado de la operación guardar y que por lo general retorna. 
    banco.save(banco).then(data => {
        res.send(data); // aquí usamos el argumento de respuesta res, para enviar una respuesta que en este caso va a ser la variable data que es la que me da la
        //información guardara anteriormente. 
      })
      .catch(err => { //catch funciona para capturar los errores y su variable de captura dentro de la funcion es err (aquí puedes poner cualquier cosa)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Banco."
        });//lo mismo aquí, se retorna una respuesta por medio del res para que se muestre al momento que ocurra un error. 
      });
};

//tenemos el findAll que basicamente es buscar todos los registros guardados de esa entidad. 
//recibiendo sus parametros de solicitud y respuesta igualmente. 
exports.findAll = (req, res) => {
    const name1 = req.query.name1;
    var condition = name1 ? { name1: { $regex: new RegExp(name1), $options: "i" } } : {};
  
    //tenemos el metodo find en este caso que va a buscar todo. leugo de eso, la información que retorne se almacena en data y luego puedes manipularla antes de 
    //retornarla por la variable res
    Banco.find(condition).then(data => {

        // dentro de los cuerpos puedes hacer todo tipo de operaciones, for, if, arreglos, asignaciones. 
        // aquí es donde se modifica cuando se requiere la información incluso, se pueden crear funciones para realizar la operacion 

        // Este era el requerimiento anterior. 
        for(var i = 0; i< data.length; i++){
          var row = data[i];
          row.esRecorrido = true;
        }

        res.send(data);
        //processEjemplo(data);

      }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Banco."
      });
    });
};

//function processEjemplo(data){
  //procesamos
  //res.send(data);
//}

//en los demas metodos es lo mismo, se hace la consulta, se retorna la información y la puedes manipular, todo va a depender como esté el orden del 
//proyecto, porque puede que la logica se pueda manejar desde otro archivo, pero siempre será llamada dentro de la ejecución. 

exports.findOne = (req, res) => {
  const id = req.params.id;

  Banco.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Banco with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Banco with id=" + id });
    });
};
  
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Banco.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Banco with id=${id}. Maybe Banco was not found!`
          });
        } else res.send({ message: "Banco was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Banco.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Banco with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Banco was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Banco with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Banco.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Person were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all banco."
        });
      });
};