'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Transaction to create a report
 * @param {org.afs.com.CreateReport} tx Logic to create report 
 * @transaction
 */
async function createReport(tx) {
    var uHash = tx.asset.uHash;
    var id = tx.asset.reportID;

    //changing the Income Report to new Value
    tx.asset.iHash = tx.iHashValue;

    //updating the Asset Registry
    return getAssetRegistry(org.ags.com.asset)
    .then(function(assetRegistry){
        return assetRegistry.update(tx.asset);
    
    //emit event to get the Promise
    var event = getFactory().newEvent(org.afs.com.event,submitReport);
    event.asset = tx.asset;
    event.asset.reportID;
    event.iHash = tx.iHashValue;
    emit(event);
    })

}