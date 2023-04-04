const { banco } = require("../models");
const db = require("../models");
const Banco = db.banco;

exports.create = (req, res) => {
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

   
    banco
      .save(banco)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Banco."
        });
      });
};

exports.findAll = (req, res) => {
    const name1 = req.query.name1;
    var condition = name1 ? { name1: { $regex: new RegExp(name1), $options: "i" } } : {};
  
    Banco.find(condition)
    .then(data => {
        res.send(data);
      })
      
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Banco."
      });
    });
};

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