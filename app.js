const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const port = 8080;


//read the JSON file
var car_info = JSON.parse(fs.readFileSync(__dirname+'\\data\\car.json', 'utf8'));
var can_bus_message = JSON.parse(fs.readFileSync(__dirname+'\\data\\canbus.json', 'utf8'));



//convert to strings
car_info = JSON.stringify(car_info)
can_bus_message = JSON.stringify(can_bus_message)

//console.log(obj);

//extract keys from the JSON object
/*
var keys = Object.keys(obj);
for (var i = 0; i < keys.length; i++) {
  console.log(obj[keys[i]]);
}
*/

//set the view
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Mosca MQTT broker
// Mosca MQTT broker
var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)

broker.on('ready', ()=>{
    console.log('Broker is ready!')
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
})




app.post('/send', (req, res) => {
// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'car_info'
var message = car_info+'\n'+can_bus_message

client.on('connect', ()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
})
res.send('Data Sent!!!');
});


//return the index page with send html page
app.get('/', (req, res) => {
   res.render('index');
  });



app.listen(port, () => {
  console.log(`Server running on port${port}`);
});