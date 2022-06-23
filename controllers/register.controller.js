const DB = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password === confirm_password && password.length > 7) {
    DB.query(
      `select email from users where email = ?`, [email],
      async (err, result) => {
        if (!err) {
            console.log(result)
          if (result.length > 0) {
            return res.status(400).render("register", {
              message: "That email is already in use!",
            });
          } else {
            let hashedPassword = await bcrypt.hash(password, 8);

            DB.query(
              `insert into users set ?`,
              {
                username,
                email,
                password: hashedPassword,
              },
              (error, result1) => {
                if (error) {
                  res.status(500).render("register", {
                    message: "Something went wrong on server!",
                  });
                } else {
                    console.log(result1)
                  return res.status(200).render("login", {
                    success: "User registered successfully!",
                  });
                }
              }
            );
          }
        } else {
            console.log(err)
          res.status(500).render("register", {
            message: "Something went wrong on server!",
          });
        }
      }
    );
  } else {
    res.status(400).render("register", {
      message:
        "Check your passwords whether they have 8 charecters and do match!",
    });
  }
};
