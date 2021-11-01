# MQTT-Publisher
The project works in conjunction with the MQTT Subscriber. The Publisher publishes a message to which the subscriber is subscribed and then the subscriber app put this data on the VCAN bus. The first app reads data from JSON files and publishes the data to the MOSCA broker. The later app stores this data again in JSON files and broadcasts the data on the CAN bus. 

install by the following procedure

npm install express
npm install mqtt
npm install mosca