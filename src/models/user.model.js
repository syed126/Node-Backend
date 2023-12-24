var dbConn = require('./../../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//User object create
var User = function(user){
    this.name       = user.name;
    this.email      = user.email;
    this.password   = bcrypt.hashSync(user.password, 10);
    this.role       = user.role ? user.role : 1;
    this.status     = user.status ? user.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
  };

  User.userRegister = function(data, result) {
    dbConn.query("INSERT INTO users set ?", data, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  User.userLogin = function (data, result) {
    const { email, password } = data;

    dbConn.query("SELECT * FROM users WHERE email = ?", [email], function (err, res) {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        if (res.length > 0) {
            const user = res[0];
            // Compare the entered password with the hashed password in the database

            console.log(user.password)
            console.log(password)
            console.log('===========')


            bcrypt.compare(password, user.password, function (bcryptErr, res) {
                if (bcryptErr) {
                    console.log("error: ", bcryptErr);
                    return result(bcryptErr, null);
                }

                console.log(res)

                if (res) {
                    // Passwords match, generate an access token using jsonwebtoken
                    const accessToken = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
                    return result(null, { user, accessToken });
                } else {
                    // Passwords don't match
                    console.log("Invalid password");
                    return result({ message: "Invalid password" }, null);
                }
            });
        } else {
            // User not found
            return result({ message: "User not found" }, null);
        }
    });
};
  
  module.exports = User;