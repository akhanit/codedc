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

    var Reports = {
        'r001': {
                  uHash: '',
                  iHash: '',
                  IssueDate:'',
                  DateChecked:'',
                  Status:'Pending',
                  Creater:'p001'
        },
        'r002': {
                uHash: '',
                iHash: '',
                IssueDate:'',
                DateChecked:'',
                Status:'Pending',
                Creater:'p001'
        },
        'r003': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
        'r004': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
        'r005': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
        'r006': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
        'r007': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
        'r008': {
            uHash: '',
            iHash: '',
            IssueDate:'',
            DateChecked:'',
            Status:'Pending',
            Creater:'p001'
        },
    };
   

    var Individual = {
  				'u001':[
                  	  {'userID':'u001',
                       'First_Name':'John',
                       'Last_Name':'Williams',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NDJNDSHOIDUSHFKFSD',
                       'reports':['r001','r002','r003']
                       }
                	],
                'u002': [
      				  {'userID':'u002',
                       'First_Name':'Rick',
                       'Last_Name':'Winter',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOIDUSHFKFSD',
                       'reports':['r004','r005']
                      }
    				],
                'u003': [
                  	  {'userID':'u003',
                       'First_Name':'Tom',
                       'Last_Name':'Anderson',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOINUSHFHPOI',
                       'reports':['r006','r007','r008']
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

                return getAssetRegistry(ns+'.Report')
                .then(function(assetRegistry){
                    r = [];
                    for(var mreport in Reports){
                        reportID = Reports[mreport];
                        for(var j=0;j<reportID.length; j++ ){
                            var reportTemplate = reportID[j];
                            var report = factory.newResource(ns,'Report',mreport);
                            report.uHash = '1111';
                            report.iHash ='1111';
                            report.IssueDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                            report.DateChecked = '';
                            individual.reports = factory.newRelationship(ns,'Report',mreport);
                            r.push(report);
                        }
                    }
                return assetRegistry.addAll(r);
                });

              	ind.push(individual);
            }
        }

     return individualRegistry.addAll(ind);
	});
}

