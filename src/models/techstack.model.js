var dbConn = require('./../../config/db.config');
//Employee object create
var Techstack = function(techstack){
  this.first_name     = techstack.first_name;
  this.last_name      = techstack.last_name;
  this.email          = techstack.email;
  this.phone          = techstack.phone;
  this.organization   = techstack.organization;
  this.designation    = techstack.designation;
  this.salary         = techstack.salary;
  this.status         = techstack.status ? techstack.status : 1;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};