composer card delete -n PeerAdmin@fabric-network
composer card delete -n admin@codedc_net

composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin

composer card import -f PeerAdmin@fabric-network.card

composer runtime install -c PeerAdmin@fabric-network -n codedc_net

composer network start -c PeerAdmin@fabric-network -a codedc_net@0.0.1.bna -A admin -S adminpw

composer card import -f admin@codedc_net.card

composer network ping -c admin@codedc_net