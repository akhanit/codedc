'use strict';

var crypto = require('crypto')
var factory = getFactory()
var ns = 'org.afs.com'

function _hash(x){ 
    return crypto.createHash('sha256').update(x).digest('hex').toUpperCase().substring(0, 20)
}

function generateReports(User,Income){
    return getAssetRegistry(ns + '.Report')
   .then(function(assetRegistry){
             var r = [];
             for( var j=0;j<User.reports.length; j++ ){
                   var report = factory.newResource(ns,'Report',User.reports[j]);
                   report.uHash = User.uHash;
                   report.iHash = _hash(Income.toString());
                   report.IssueDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                   report.DateChecked = '';
                   var pID = Reports[User.reports[j]];
                   report.creator =  factory.newRelationship(ns,'PayrollProcessor',pID);
                   report.status = "ISSUED";
                   r.push(report);
              }
   return assetRegistry.addAll(r);
  });
}

var ReportsOwners = {
    'r001':'p001',
    'r002':'p001',
    'r003':'p001',
    'r004':'p001',
    'r005':'p002',
    'r006':'p001',
    'r007':'p001',
    'r008':'p002',
};

var Individuals = {
    'u001':[
          {'userID':'u001',
         'First_Name':'John',
         'Last_Name':'Williams',
         'Ocupation':'Developer',
         'Employer':'Accenture',
         'uHash':_hash('123456789'),
         'reports':['r001','r002','r003']
         }
      ],
  'u002': [
          {'userID':'u002',
         'First_Name':'Rick',
         'Last_Name':'Winter',
         'Ocupation':'Developer',
         'Employer':'Accenture',
         'uHash':_hash('345678912'),
         'reports':['r004','r005']
        }
      ],
  'u003': [
          {'userID':'u003',
         'First_Name':'Tom',
         'Last_Name':'Anderson',
         'Ocupation':'Developer',
         'Employer':'Accenture',
         'uHash':_hash('678912345'),
         'reports':['r006','r007','r008']
        }
        ]
};

/**
 * Write your transction processor functions here
 */


/**
 * Transaction to manage a report
 * @param {org.afs.com.createReport} tx 
 * @transaction
 */

function createReport(tx){
  
    //Getting Factory
    var factory = getFactory();
  	var TargetUser = tx.ReportOwner;
  
    //Assigning Namespace
    var ns = 'org.afs.com';
  
    //Get the ID of the Transaction Submitter
	var pID = getCurrentParticipant().getIdentifier();
    //var pID = Submitter.pID;

    //Initializing reportID
    var reportID = '';
   
   return getAssetRegistry(ns+'.Report')
  .then(function(assetRegistry){
     //Initializing report object that is passed to function that creates the reportID 
     var report = {};
     return assetRegistry.getAll()
  	.then(function(reports){
        
        //Create reportID looking if count is single digit or double digit
     	if(reports.length < 9){
            reportID = 'r00'+(r.length+1).toString();
        }
        else{         
            reportID = 'r0'+(r+1).toString();
        }
       
        //Creating "report" as a new resource of class: org.afs.com.Report
        report = factory.newResource(ns,'Report',reportID);
        
        //Assign property parameters to new report object
        report.uHash = TargetUser.uHash;
        //Client application will pass the hash of income data
        report.iHash = _hash(tx.iHash);
        //Pending to check if tx.Date() works best
        report.IssueDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        //Creating a relationship to the Payroll Processor invoking the transaction
        report.creator = factory.newRelationship(ns,'PayrollProcessor',pID);

        report.status = "ISSUED";
        report.DateChecked = '';

        //Push report to corresponding Tax Payer
        TargetUser.reports.push(reportID);   	
        
        //Finally we add the new report to the Asset Registry (Report)
   		return assetRegistry.add(report);
     })
   })
  .then(function(){
     return getParticipantRegistry(ns+'.individual');
   })
  .then(function(individualRegistry){
     //Updating state data of corresponding Tax Payer 
     return individualRegistry.update(TargetUser);
   })
  .then(function(){
    //Emitting Create Transaction Event with corresponding parameters for Tx
     var event = factory.newEvent(ns, 'createReportEvent');
     event.iHash = tx.iHash;
     event.ReportOwner = tx.ReportOwner;
     emit(event);
  });
}


/**
 * Transaction to manage a report
 * @param {org.afs.com.validateReport} tx 
 * @transaction
 */

function validateReport(tx){
    //Getting Factory
    var factory = getFactory();

    //Assigning Namespace
    var ns = 'org.afs.com';

    //Returning Report Asset Registry
    return getAssetRegistry(ns+'.Report')
    .then(function(assetRegistry){
            //Get Report corresponding to ReportID in Tx
            var report = tx.report;
            //Evaluating if both Hashes for User Hash and Income Hash are the same stored in the Report
            if( tx.iHash != report.iHash && tx.uHash != report.uHash ){
                report.status = "INVALID";
            }
            else {
                report.status = "VALID";
            }
            //Assigning a Timestamp to Report Property: DateChecked
            report.DateChecked = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            //Update the Asset Registry to reflect the changes in Report Status and DateChecked
            return assetRegistry.update(report);
        })
    .then(function(){
            //Emit event Validate Report with corresponding parameters for Tx
            var event = factory.newEvent(ns, 'validateReportEvent');
            event.iHash = tx.iHash;
            event.uHash = tx.uHash;
            event.report = tx.report;
            emit(event);
    });
}


/**
 * Transaction to manage a report
 * @param {org.afs.com.setupDemo} setupDemo - the Setup Demo transaction
 * @transaction
 */
function setupDemo() {

    return getParticipantRegistry(ns + '.PayrollProcessor')
    .then(function(ppRegistry){
        var PP = [];
    	var PP1 = factory.newResource(ns,'PayrollProcessor','p001')
        PP1.pName = 'Income Processor 1';
        PP.push(PP1);
        var PP2 = factory.newResource(ns,'PayrollProcessor','p002')
        PP2.pName = 'Income Processor 2';
        PP.push(PP2);
        return ppRegistry.addAll(PP);
    })
    .then(function(){
    return getParticipantRegistry(ns + '.individual');
    })
    .then(function(individualRegistry) {
              var ind = [];

              for (var muserID in Individuals){ 
                      userID = Individuals[muserID];
                  for ( var i=0; i<userID.length; i++){
                      var individualTemplate = userID[i];
                      var individual = factory.newResource(ns,'individual',individualTemplate.userID);
                      individual.uType = 'Tax Payer';
                      individual.First_Name = individualTemplate.First_Name;
                      individual.Last_Name = individualTemplate.Last_Name;
                      individual.Ocupation = individualTemplate.Ocupation;
                      individual.Employer = individualTemplate.Employer;
                      individual.uHash = individualTemplate.uHash;
					  individual.reports = individualTemplate.reports;
                    
                      generateReports(individual);
                    
                      ind.push(individual);

                  }
              }
     return individualRegistry.addAll(ind);
   });
}

/**
 * Transaction to manage a report
 * @param {org.afs.com.resetDemo} resetDemo - the Reset Demo transaction
 * @transaction
 */

 //Do not use!! Still on development...
function resetDemo() {
  
 return getParticipantRegistry(ns+'.individual')
  .then(function(individualRegistry){
     return individualRegistry.getAll();
   })
  .then(function(individuals){
     individuals.forEach(function(ind){
		return individualRegistry.remove(ind.userID);
     });                 
   })
  .then(function(){
     return getParticipantRegistry(ns+'.PayrollProcessor');
   })
  .then(function(ppRegistry){
     return ppRegistry.remove('p001');
   })
  .then(function(){
     return getAssetRegistry(ns + '.Report');
   })
  .then(function(assetRegistry){
     return assetRegistry.getAll();
   })
  .then(function(reports){
     reports.forEach(function(report){
        return assetRegistry.remove(report.reportID);
     });
   });
}