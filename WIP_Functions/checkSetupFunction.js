// const crypto = require('crypto');
// const hash = require('./util.js');

// var TaxPayer = {
//      userID : '' ,
//      First_Name:'',
//      Last_Name:'',
//      Ocupation:'',
//      Employer:'',
//      Years_Employed:0,
//      uHash:'',
//      reports:[]
// };

// var report = {
//     reportID: '',
//     uHash: '',
//     iHash: '',
//     IssueDate:'',
//     DateChecked:'',
//     Status:'',
// }

// function setupDemo() {
 
//     var factory = getFactory();
//     var ns = 'org.afs.com';

//     var Reports = {
//         'r001': {
//                   uHash: '',
//                   iHash: '',
//                   IssueDate:'',
//                   DateChecked:'',
//                   Status:'Pending',
//                   Creater:'p001'
//         },
//         'r002': {
//                 uHash: '',
//                 iHash: '',
//                 IssueDate:'',
//                 DateChecked:'',
//                 Status:'Pending',
//                 Creater:'p001'
//         },
//         'r003': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//         'r004': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//         'r005': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//         'r006': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//         'r007': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//         'r008': {
//             uHash: '',
//             iHash: '',
//             IssueDate:'',
//             DateChecked:'',
//             Status:'Pending',
//             Creater:'p001'
//         },
//     };
   

//     var Individual = {
//   				'u001':[
//                   	  {'userID':'u001',
//                        'First_Name':'John',
//                        'Last_Name':'Williams',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NDJNDSHOIDUSHFKFSD',
//                        'reports':['r001','r002','r003']
//                        }
//                 	],
//                 'u002': [
//       				  {'userID':'u002',
//                        'First_Name':'Rick',
//                        'Last_Name':'Winter',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NUSHFHPOIDUSHFKFSD',
//                        'reports':['r004','r005']
//                       }
//     				],
//                 'u003': [
//                   	  {'userID':'u003',
//                        'First_Name':'Tom',
//                        'Last_Name':'Anderson',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NUSHFHPOINUSHFHPOI',
//                        'reports':['r006','r007','r008']
//                       }
//                   	]
//    	};

//    return getParticipantRegistry(ns + '.individual')
//    .then(function(individualRegistry) {
//         var ind = [];
//      	for (var muserID in Individual){ 
//                 userID = Individual[muserID];
//      		for ( var i=0; i<userID.length; i++){
//           		var individualTemplate = userID[i];
//                 var individual = factory.newResource(ns,'individual',individualTemplate.userID);
//               	individual.uType = 'Tax Payer';
//                 individual.First_Name = individualTemplate.First_Name;
//                 individual.Last_Name = individualTemplate.Last_Name;
//                 individual.Ocupation = individualTemplate.Ocupation;
//                 individual.Employer = individualTemplate.Employer;
//                 individual.uHash = individualTemplate.uHash;

//                 return getAssetRegistry(ns+'.Report')
//                 .then(function(assetRegistry){
//                     r = [];
//                     for(var mreport in Reports){
//                         reportID = Reports[mreport];
//                         for(var j=0;j<reportID.length; j++ ){
//                             var reportTemplate = reportID[j];
//                             var report = factory.newResource(ns,'Report',mreport);
//                             report.uHash = '1111';
//                             report.iHash ='1111';
//                             report.IssueDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
//                             report.DateChecked = '';
//                             individual.reports = factory.newRelationship(ns,'Report',mreport);
//                             r.push(report);
//                         }
//                     }
//                 return assetRegistry.addAll(r);
//                 });

//               	ind.push(individual);
//             }
//         }

//      return individualRegistry.addAll(ind);
// 	});
// }




// function setupDemo() {
 
//     var factory = getFactory();
//     var ns = 'org.afs.com';

//     reportU1 = 'r001';
//     reportU2 = 'r002';
//     reportU3 = 'r003';

//     var Individual = {
//   				'u001':[
//                   	  {'userID':'u001',
//                        'First_Name':'John',
//                        'Last_Name':'Williams',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NDJNDSHOIDUSHFKFSD',
//                        'reports':'r001'
//                        }
//                 	],
//                 'u002': [
//       				  {'userID':'u002',
//                        'First_Name':'Rick',
//                        'Last_Name':'Winter',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NUSHFHPOIDUSHFKFSD',
//                        'reports':'r002'
//                       }
//     				],
//                 'u003': [
//                   	  {'userID':'u003',
//                        'First_Name':'Tom',
//                        'Last_Name':'Anderson',
//                        'Ocupation':'Developer',
//                        'Employer':'Accenture',
//                        'uHash':'NUSHFHPOINUSHFHPOI',
//                        'reports':'r003'
//                       }
//                   	]
//    	};

//    return getParticipantRegistry(ns + '.individual')
//    .then(function(individualRegistry) {
//         var ind = [];
//      	for (var muserID in Individual){ 
//                 userID = Individual[muserID];
//      		for ( var i=0; i<userID.length; i++){
//           		var individualTemplate = userID[i];
//                 var individual = factory.newResource(ns,'individual',individualTemplate.userID);
//               	individual.uType = 'Tax Payer';
//                 individual.First_Name = individualTemplate.First_Name;
//                 individual.Last_Name = individualTemplate.Last_Name;
//                 individual.Ocupation = individualTemplate.Ocupation;
//                 individual.Employer = individualTemplate.Employer;
//                 individual.uHash = individualTemplate.uHash;
//                 if(individualTemplate.userID == 'u001'){
//                     individual.reports = factory.newRelationship(ns,'Report',reportU1);
//                 }
//                 else if (individualTemplate.userID == 'u002'){
//                     individual.reports = factory.newRelationship(ns,'Report',reportU2);
//                 }
//                 else {
//                     individual.reports = factory.newRelationship(ns,'Report',reportU3);
//                 }

          	
//               	ind.push(individual);
//             }
//         }
//      return individualRegistry.addAll(ind);
// 	});
// }


