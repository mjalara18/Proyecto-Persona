const { personFood } = require("../models");
const db = require("../models");
const PersonFood = db.personFood;
var amount = 0
var state = 

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (req.body.amount > 5){
    state = 'activo'
  } else {
    state = 'inactivo'
  }

  const personFood = new PersonFood ({
    person: req.body.person,
    food: req.body.food,
    amount : req.body.amount,
    state: req.body.state
});

personFood
    .save(personFood)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the personFood."
      });
    });
};
 
exports.findAll = (req, res) => {
    const person = req.query.person;
    var condition = person ? { person: { $regex: new RegExp(person), $options: "i" } } : {};
  
    person.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PersonFood."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Person.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found PersonFood with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving PersonFood with id=" + id });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    PersonFood.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete PersonFood with id=${id}. Maybe PersonFood was not found!`
          });
        } else {
          res.send({
            message: "PersonFood was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PersonFood with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
  PersonFood.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} PersonFood were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all PersonsFoods."
      });
    });
};