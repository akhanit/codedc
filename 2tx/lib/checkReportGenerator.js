const crypto = require('crypto');

function reportGenerator(reportGenerator) {

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
                    reportTemplate = r[i];
                    r.owner=reportGenerator.owner;
                    reportTemplate.issueDate = '01/15/'+(currentYear - i).toString();
                    reportTemplate.PayrollProcessor = reportGenerator.PayrollProcessor; 

                    var genuHash = crypto.createHmac('sha256',reportGenerator.owner);
                    var geniHash = crypto.createHmac('sha256',reportGenerator.Employer+reportGenerator.owner);

                    reportTemplate.uHash = genuHash;
                    reportTemplate.iHash = geniHash;

                    if(i = 1){
                        reportTemplate.ReportStatus = 'Pending';
                    }
                    else{
                        reportTemplate.ReportStatus = 'Valid';
                    }
                    
                    r.push(reportTemplate);

            }

    console.log(r);

}  
