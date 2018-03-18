'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Transaction to manage a report
 * @param {org.afs.com.validateReport} tx 
 * @transaction
 */

function validateReport(tx){
    //Getting Factory
    var factory = getFactory();

    //Asigning Namespace
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
            //Asigning a Timestamp to Report Property: DateChecked
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
 
    var factory = getFactory();
    var ns = 'org.afs.com';

    reportU1 = 'r001';
    reportU2 = 'r002';
    reportU3 = 'r003';

    var Individual = {
  				'u001':[
                  	  {'userID':'u005',
                       'First_Name':'Adina',
                       'Last_Name':'ANton',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NDJNDSHOIDUSHFKFSD',
                       'reports':'r001'
                       }
                	],
                'u002': [
      				  {'userID':'u004',
                       'First_Name':'Asad',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOIDUSHFKFSD',
                       'reports':'r002'
                      }
    				],
                'u003': [
                  	  {'userID':'u006',
                       'First_Name':'David',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOINUSHFHPOI',
                       'reports':'r003'
                      }
                  	]
   	};

   return getParticipantRegistry(ns + '.individual')
   .then(function(individualRegistry) {
        var ind = [];
     	for (var muserID in Individual){ 
                userID = Individual[muserID];
     		for ( var i=0; i<userID.length; i++){
          		var individualTemplate = userID[i];
                var individual = factory.newResource(ns,'individual',individualTemplate.userID);
              	individual.uType = 'Tax Payer';
                individual.First_Name = individualTemplate.First_Name;
                individual.Last_Name = individualTemplate.Last_Name;
                individual.Ocupation = individualTemplate.Ocupation;
                individual.Employer = individualTemplate.Employer;
                individual.uHash = individualTemplate.uHash;
                if(individualTemplate.userID == 'u001'){
                    individual.reports = factory.newRelationship(ns,'Report',reportU1);
                }
                else if (individualTemplate.userID == 'u002'){
                    individual.reports = factory.newRelationship(ns,'Report',reportU2);
                }
                else {
                    individual.reports = factory.newRelationship(ns,'Report',reportU3);
                }

          	
              	ind.push(individual);
            }
        }
     return individualRegistry.addAll(ind);
	});
}


