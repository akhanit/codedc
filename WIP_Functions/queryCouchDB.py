import couchdb as cdb

couchserver = cdb.client.Server("http://localhost:5984/")


for dbname in couchserver:
    print(dbname)

db = couchserver['composerchannel']



for row in db.view('all_docs'):
    print(row)






