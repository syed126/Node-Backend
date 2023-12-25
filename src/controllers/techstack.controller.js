const Techstack = require('../models/techstack.model');


exports.create = function(req, res) {
      if (!req.file) {
        return res.status(400).json({ error: true, message: 'Please provide an image file' });
      }
  
      // Attach the file path to the new_employee object
      new_employee.image = req.file.path;
  
      // Handles null error
      if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({ error: true, message: 'Please provide all required fields' });
      } else {
        Employee.create(new_employee, function(err, employee) {
          if (err)
            res.send(err);
          res.json({ error: false, message: 'Employee added successfully!', data: employee });
        });
      }
  };