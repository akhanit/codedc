'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Transaction to manage a report
 * @param {org.afs.com.manageReport} tx 
 * @transaction
 */

function manageReport(tx) {
  	var uHash = tx.uHash;
  	var iHash = tx.iHash;
  	
  	return getAssetRegistry('org.afs.com.Report')
    .then(function(assetRegistry){
      	return assetRegistry.exists(uHash);
    })
    .then(function(exists) {
      	var flag = exists;
     });
  
     if(flag == 0) {
       return getAssetRegistry('org.afs.com.Report')
       .then(function(assetRegistry){
       		var factory = getFactory();
            asset = factory.newResource('org.afs.com','Report',uHash);
            asset.iHash = iHash;
            return assetRegistry.add(asset);
       });
      }
      else {
          console.log("Already exists");
      }
}

/**
 * Transaction to manage a report
 * @param {org.afs.com.queryReport} tx 
 * @transaction
 */

function queryReport(tx) {	
  var uHash = tx.uHash;
  
  return getAssetRegistry('org.afs.com.Report') 
  .then(function(assetRegistry) {
    return assetRegistry.get(uHash);
  })
}