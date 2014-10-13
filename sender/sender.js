var Bleacon = require('bleacon');
console.log("started");

if (process.argv.length!=4) {
  console.log ("Usage: sudo node server.js [P1|P2|P3] <server>");
  process.exit(-1);
}
console.log(process.argv.length);
var position = process.argv[2];
var server = process.argv[3];

console.log("Position: "+position+" Server: " + server);

// Create a websocket server. This has to be done in node as
// normal javascript cannot create a server only a listener
var ws = require('ws');
var socket = new ws("ws://"+server+":9876");

socket.on('open', function(){
	console.log('opened');
	
});
Bleacon.on('discover', function(bleacon) {
		var info = '{"position":"'+position+'", "beacon": '
			+'"'+bleacon.major+'", '
			+'"rssi":'+bleacon.rssi+', '
			+'"distance":'+distance(bleacon) + ', '
			+'"measuredPower":'+bleacon.measuredPower
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
