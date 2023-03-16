const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:1234"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la app personas" });
});

app.get("/foods", function (req, res) {
  Food.find({}, function (err, foods) {
    Person.populate(foods, { path: "persons" }, function (err, foods) {
      res.status(200).send(foods);
    });
  });
});

require("./app/routes/person.routes")(app);
require("./app/routes/alimento.routes")(app);
require("./app/routes/persona_alimento.routes")(app);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
