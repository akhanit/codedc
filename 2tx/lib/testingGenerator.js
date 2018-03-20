const crypto = require('crypto');
const individual = require('./Individual');


var allIndividual = [];


var ind = new individual();
ind.First_Name = 'John';
ind.Last_Name = 'Williams';
ind.yearsEmployed = 5;
ind.Ocupation = 'Developer';
ind.Employer = 'Accenture';

allIndividual.push(ind);


console.log(allIndividual);