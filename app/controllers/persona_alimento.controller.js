const { personFood } = require("../models");
const db = require("../models");
const PersonFood = db.personFood;
var amount = 0

exports.create = (req, res) => {
  if(!req.body.person) { 
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  var state = true ;

  if (req.body.amount > 5){
    state = true
  } else {
    state = false
  }

  const personFood = new PersonFood ({
    person: req.body.person,
    food: req.body.food,
    amount : req.body.amount,
    state: state
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
  
    PersonFood.find(condition)
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
  
    PersonFood.findById(id)
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

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    PersonFood.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update PersonFood with id=${id}. Maybe PersonFood was not found!`
          });
        } else res.send({ message: "PersonFood was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PersonFood with id=" + id
        });
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