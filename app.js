const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
// app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
// using as middleware
app.use('/api/v1', employeeRoutes)

const userRoutes = require('./src/routes/user.routes')
// using as middleware
app.use('/api/v1', userRoutes)

const apiRoutes = require('./src/routes/api.routes')
app.use('/api/v1', apiRoutes)




// listen for requests
app.listen(port, () => {
  console.log(`working`);
});