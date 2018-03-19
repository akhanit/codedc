let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

function setupDemo() {
 
    // var factory = getFactory();
    // var ns = 'org.afs.com';

    var Individual = {
  				'u001':[
                  	  {'userID':'u001',
                       'First_Name':'Carlo',
                       'Last_Name':'Burgos',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NDJNDSHOIDUSHFKFSD',
                       'reports':'r001'
                       }
                	],
                'u002': [
      				  {'userID':'u002',
                       'First_Name':'Asad',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOIDUSHFKFSD',
                       'reports':'r002'
                      }
    				],
                'u003': [
                  	  {'userID':'u003',
                       'First_Name':'David',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOINUSHFHPOI',
                       'reports':'r003'
                      }
                  	]
   	};

//    return getParticipantRegistry(ns + '.individual')
//    .then(function(individualRegistry) {
var ind = [];
for (var muserID in Individual){ 
    userID = Individual[muserID];
    for ( var i=0; i<userID.length; i++){
        var individualTemplate = userID[i];
        console.log(individualTemplate.userID);
        ind.push(individualTemplate);
        console.log(ind);
    }
};

}

setupDemo();

var rgenerator1 = {
    'owner':'u001',
    'yearReport':5,
    'Employer':'Accenture',
    'PayrollProcessor':'p001'         
}

function reportGenerator(reportGenerator) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var r = [];

            for(i = 1;reportGenerator.yearReport;i--){
                
                var report = {
                            'reportId':'',
                            'uHash':'',
                            'iHash':'',
                            'issueDate':'',
                            'DateChecked':'',
                            'ReportStatus':'',
                            'PayrollProcessor':''
                }

                report.owner=reportGenerator.owner;
                report.issueDate = '01/15/'+(currentYear - i).toString();
                report.PayrollProcessor = reportGenerator.PayrollProcessor; 

                var genuHash = crypto.createHmac('sha256',reportGenerator.owner);
                var geniHash = crypto.createHmac('sha256',reportGenerator.Employer+reportGenerator.owner);

                report.uHash = genuHash;
                report.iHash = geniHash;

                if(i = 1){
                    report.ReportStatus = 'Pending';
                }
                else{
                    report.ReportStatus = 'Valid';
                }
                
                r.push(report);

            }

        console.log(r);

}  

reportGenerator(rgenerator1);