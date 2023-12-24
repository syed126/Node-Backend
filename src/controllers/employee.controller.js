
const Employee = require('../models/employee.model');
const multer = require('multer');
const path = require('path');

exports.findAll = function(req, res) {
Employee.findAll(function(err, employee) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', employee);
  res.send(employee);
});
};


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename: function (req, file, cb) {
    // Append the current timestamp to the filename to make it unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.create = function(req, res) {
  // Use upload.single middleware to process a single file with the field name 'image'
  upload.single('image')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: true, message: 'Error uploading file' });
    }

    // Continue with creating the employee if file upload is successful
    const new_employee = new Employee(req.body);

    // Check if there is a file attached in the request
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
  });
};


exports.findById = function(req, res) {
Employee.findById(req.params.id, function(err, employee) {
  if (err)
  res.send(err);
  res.json(employee);
});
};


exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Employee.update(req.params.id, new Employee(req.body), function(err, employee) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Employee successfully updated' });
});
}
};


exports.delete = function(req, res) {
Employee.delete( req.params.id, function(err, employee) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Employee successfully deleted' });
});
};