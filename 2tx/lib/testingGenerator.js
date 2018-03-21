const crypto = require('crypto');
const individual = require('./Individual');
const hashcreator = require('./util.js');

let hash = new hashcreator();


var allIndividual = []; 


var ind = new individual();
ind.First_Name = 'John';
ind.Last_Name = 'Williams';
ind.yearsEmployed = 5;
ind.Ocupation = 'Developer';
ind.Employer = 'Accenture';



// ind.uHash = hash.createUHash(individual.First_Name+individual.Last_Name);

var uHash = hash.update(individual.First_Name+individual.Last_Name);
ind.uHash = uHash.digest('hex');
allIndividual.push(ind);


console.log(allIndividual);