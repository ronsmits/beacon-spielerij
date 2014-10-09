var Bleacon = require('bleacon');
console.log("started");

// Create a websocket server. This has to be done in node as
// normal javascript cannot create a server only a listener
var ws = require('ws');
var socket = new ws("ws://192.168.33.21:9876");

socket.on('open', function(){
	console.log('opened');
	
});
Bleacon.on('discover', function(bleacon) {
		var info = '{"position":"P1", "beacon": '
			+'"'+bleacon.major+'", '
			+'"rssi":'+bleacon.rssi+', '
			+'"distance":'+distance(bleacon) + ', '
			+'"measurePower":'+bleacon.measuredPower
			+'}';
 		socket.send(info);
});

Bleacon.startScanning('b9407f30f5f8466eaff925556b57fe6d');


// calculate the distance. we dont really do a lot with this.
var distance = function(bleacon) {
  var dist = Math.pow(10.0, ((bleacon.measuredPower+(-1*bleacon.rssi))/(10.0*2.2)));
  console.log(bleacon.accuracy+" " +bleacon.major+" "+dist);
return dist;
  //console.log(bleacon.uuid+" " + bleacon.major+" " + bleacon.rssi);
}
