const crypto = require('crypto');
const hash = crypto.createHash('sha256');


class HashCreator {

    createUHash (string){
        var uHash = hash.update(string);
        return uHash.digest('hex');
    }

    createIHash(string){

        var iHash = hash.update(string);
        return iHash.digest('hex');
    }
};

module.exports = HashCreator;