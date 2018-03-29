
/**
 * Transaction to manage a report
 * @param {org.afs.com.setupDemo} setupDemo - the Setup Demo transaction
 * @transaction
 */
function setupDemo() {
 
    var factory = getFactory();
    var ns = 'org.afs.com';

    var Reports = {
        'r001': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r002': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r003': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r004': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r005': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r006': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r007': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
        'r008': [{
                  'uHash': '',
                  'iHash': '',
                  'IssueDate':'',
                  'DateChecked':'',
                  'Status':'Pending',
                  'Creator':'p001'
        }],
    };
   

    var Individuals = {
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
  
    return getParticipantRegistry(ns + '.PayrollProcessor')
    .then(function(ppRegistry){
    	var PP = factory.newResource(ns,'PayrollProcessor','p001')
        PP.pName = 'Income Processor';
        return ppRegistry.add(PP);
    })
    .then(function(){
      return getAssetRegistry(ns + '.Report');
    })
    .then(function(assetRegistry){
         	var r = [];
       		var userID = Object.keys(Individuals);
      		var u = 0;
      		for(var mreport in Reports){
            	reportID = Reports[mreport];         
 
               for( var j=0;j<reportID.length; j++ ){
                    var reportTemplate = reportID[j];
                    var report = factory.newResource(ns,'Report',mreport);
                    report.uHash = '1111';
                    report.iHash ='1111';
                    report.IssueDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    report.DateChecked = '';
                    report.creator =  factory.newRelationship(ns,'PayrollProcessor','p001');
					
                 	var UserTemplate = Individuals[userID[u]];
                 	var UserReports = UserTemplate.reports;
                 	
                 	var c = 1;
                 	UserReports.forEach(function(r){
                      if(r == mreport){
                        report.owner = factory.newRelationship(ns,'individual',userID[u]);
                        if(c <= UserReports.length){
                        	c = c + 1;
                        }
                        else{
                        	c = 1;
                      	}
                      }
        
                    r.push(report);
           	   }
            }
    return assetRegistry.addAll(r);
   })
   .then(function(){
    return getParticipantRegistry(ns + '.individual');
   })
   .then(function(individualRegistry) {
              var ind = [];
      		  var r = [];

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
                    
                      ind.push(individual);

                  }
              }
     return individualRegistry.addAll(ind);
   });
}