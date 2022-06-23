require("dotenv").config();

const e = require("express");
const express = require("express");
const path = require("path");
const pages = require("./routes/routes")
const authRoute = require("./routes/auth.route");
const DB = require("./database");
const app = express();
const PORT = process.env.PORT || 8080;


// connecting database
DB.connect((err) => {
  if (!err) {
    console.log("MySQL Connected...");
  } else {
    console.log(err);
  }
});



const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// root route
app.use("/", pages);
app.use("/auth", authRoute)


app.get("/users", (req, res) => {
  DB.query(`select * from users`, (err, result) => {
    if (err) {
      res.status(400).send("Bad request!");
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
