var dbConn = require('./../../config/db.config');
const bcrypt = require('bcryptjs');
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
    const {email,password} = data;
    

    dbConn.query("SELECT * FROM users WHERE email = ?", [email], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {

            console.log('data---------------')
                console.log(res)
                console.log('=============')



            if (res.length > 0) {
                const user = res[0];


                


                // Compare the entered password with the hashed password in the database
                bcrypt.compare([password], user.password, function (bcryptErr, isMatch) {
                    if (bcryptErr) {
                        console.log("error: ", bcryptErr);
                        result(bcryptErr, null);
                    } else {
                        if (isMatch) {
                            // Passwords match, return the user data
                            result(null, user);
                        } else {
                            // Passwords don't match
                            result({ message: "Invalid password" }, null);
                        }
                    }
                });
            } else {
                // User not found
                result({ message: "User not found" }, null);
            }
        }
    });
};
  
  module.exports = User;