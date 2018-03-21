
function reportGenerator() {

var reports = { 
    'u001': [{
            'r001': [{
                    'yearReport':5,
                    'Employer':'Accenture',
                    'PayrollProcessor':'p001'         
                    }],
            'r002' :  [{
                    'yearReport':5,
                    'Employer':'Accenture',
                    'PayrollProcessor':'p001'         
                    }],
            'r003' :  [{
                    'yearReport':5,
                    'Employer':'Accenture',
                    'PayrollProcessor':'p001'         
                    }]
            }],
    
};

console.log('Generating Report based on '+reports);
console.log('-------------------------------------------');

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    var allReports = [];

for(report in reports){
   r = reports[report]
   for(i = 1;r.length;i++){
        rp = {};
        reportTemplate = r[i];
        rp['owner']=reportTemplate.owner;
        rp['IssueDate'] = '01/15/'+(currentYear - i).toString();
        rp['PayrollProcessor']= reportTemplate.PayrollProcessor; 

        var genuHash = crypto.createHmac('sha256',rp.owner);
        var geniHash = crypto.createHmac('sha256',rp.Employer+rp.owner);

        rp['uHash'] = genuHash;
        rp['iHash'] = geniHash;

                    if(i = 1){
                        r['ReportStatus'] = 'Pending';
                    }
                    else{
                        r['ReportStatus'] = 'Valid';
                    }
                    
        r.push(rp);

        }
}
    console.log(r);

    
} 

reportGenerator();
