/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const IdCard = require('composer-common').IdCard;
const MemoryCardStore = require('composer-common').MemoryCardStore;
const path = require('path');

// This is the factory for creating instances of types.
let factory;

var ns = 'org.afs.com';

var businessNetwork = new BusinessNetworkConnection();

const cardStore = new MemoryCardStore();

const connectionProfile = {
    name: 'fabric-network',
    type: 'hlfv1'
};

    // Name of the business network card containing the administrative identity for the business network
    const adminCardName = 'admin';

    // Admin connection to the blockchain, used to deploy the business network
    let adminConnection;

    // This is the business network connection the tests will use.
    let businessNetworkConnection;

    // These are a list of receieved events.
    let events;

    let businessNetworkName;


        // Embedded connection does not need real credentials
        const credentials = {
            certificate: 'Admin@org1.example.com-cert',
            privateKey: '114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk'
        };

        // Identity used with the admin connection to deploy business networks
        const deployerMetadata = {
            version: 1,
            userName: 'PeerAdmin',
            roles: [ 'PeerAdmin', 'ChannelAdmin' ]
        };
        const deployerCard = new IdCard(deployerMetadata, connectionProfile);
        deployerCard.setCredentials(credentials);
        const deployerCardName = 'PeerAdmin';

        adminConnection = new AdminConnection({ cardStore: cardStore });

        return adminConnection.importCard(deployerCardName, deployerCard).then(() => {
            return adminConnection.connect(deployerCardName);
        });


/**
 * Transaction to manage a report
 * @param {org.afs.com.setupDemo} setupDemo - the Setup Demo transaction
 * @transaction
 */

function setupDemo() {
 
    var factory = getFactory();
    var namespace = 'org.afs.com';

    var Individual = [{'userID':'u001',
                       'uType':'Tax Payer',
                       'First_Name':'Carlo',
                       'Last_Name':'Burgos',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NDJNDSHOIDUSHFKFSD',
                       'reports':'r001'
                       },
                       {'userID':'u002',
                       'uType':'Tax Payer',
                       'First_Name':'Asad',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOIDUSHFKFSD',
                       'reports':'r002'
                       },
                       {'userID':'u003',
                       'uType':'Tax Payer',
                       'First_Name':'David',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOINUSHFHPOI',
                       'reports':'r003'
                       }
                   ];

   // convert array names of Individuals to be array of participant resources of type Individual with identifier of that name
   Individual = Individual.map(function (individual) {
   return factory.newResource(namespace, 'individual', individual);
   });

   return getParticipantRegistry(namespace + '.Individual')
       .then(function (individualRegistry) {
           return individualRegistry.addAll(Individual);
   });
}

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

    var Individual = {
  				'u001':[
                  	  {
                       'First_Name':'Carlo',
                       'Last_Name':'Burgos',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NDJNDSHOIDUSHFKFSD',
                       'reports':'r001'
                       }
                	],
                'u002': [
      				  {
                       'First_Name':'Asad',
                       'Last_Name':'Khan',
                       'Ocupation':'Developer',
                       'Employer':'Accenture',
                       'uHash':'NUSHFHPOIDUSHFKFSD',
                       'reports':'r002'
                      }
    				],
                'u003': [
                  	  { 
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
     	for (var userID in Individual){
     		for ( var i=0; i<userID.length; i++){
          		var individualTemplate = userID[i];
              	var individual = factory.newResource(ns,'individual',userID);
              	individual.uType = "Tax Payer";
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


