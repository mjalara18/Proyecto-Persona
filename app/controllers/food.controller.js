const { foods } = require("../models");
const db = require("../models");
const Food = db.foods;



exports.create = (req, res) => {
    if (!req.body.foodName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const food = new Food ({
      foodName: req.body.foodName,
      calories: req.body.calories,
      typeFood: req.body.typeFood,
      person: req.body.person

    });
  
    food
      .save(food)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Food."
        });
      });
};

exports.findAll = (req, res) => {
    const foodName = req.query.foodName;
    var condition = foodName ? { foodName: { $regex: new RegExp(foodName), $options: "i" } } : {};
  
    Food.find(condition)
    .then(data => {
      Food.populate(data, { path: "person" }, function (err, data) {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Foods."
      });
    });


    
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Food.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Food with id " + id });
        else{
          Food.populate(data, { path: "person" }, function (err, data) {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Food with id=" + id });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Food.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Food with id=${id}. Maybe Food was not found!`
          });
        } else {
          res.send({
            message: "Food was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Food with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Food.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Food were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Food."
        });
      });
};