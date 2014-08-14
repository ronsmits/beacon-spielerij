var Bleacon = require('bleacon');
console.log("started");
// Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0, -59);

var ws = require('ws').Server, wss = new ws({port:8080});

var connection;
   wss.on('connection', function(connection) {
      console.log('connected');
   Bleacon.on('discover', function(bleacon) {
      connection.send(JSON.stringify(bleacon));
   });
  connection.on('error', function(error) {console.log("ERR: " + error)});
});
Bleacon.on('discover', function(bleacon) {
//    console.log('found: ' + JSON.stringify(bleacon));
    distance(bleacon);
});
//Bleacon.startScanning('e2c56db5dffb48d2b060d0f5a71096e0');
Bleacon.startScanning('b9407f30f5f8466eaff925556b57fe6d');
//Bleacon.startScanning('b9407f30f5f8466eaff925556b57fe6d', 21376);
//Bleacon.startScanning();
var distance = function(bleacon) {
  var dist = Math.pow(10.0, ((bleacon.measuredPower+(-1*bleacon.rssi))/(10.0*2.2)));
//  console.log(bleacon.uuid+" " +bleacon.major+" "+dist.toFixed(9));
console.log(bleacon.uuid+" " + bleacon.major+" " + bleacon.rssi);
}
