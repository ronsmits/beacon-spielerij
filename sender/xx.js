#!/usr/bin/env node

/*
  Copyright (C) 2014 Andrew Reitz

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

  See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
*/

var uuid = require('uuid');
var Bleacon = require('bleacon');
var optimist = require('optimist');

var argv = optimist
  .usage('iBeacon command line utility')
  .describe('h', 'Displays this message')
  .alias('h', 'help')
  .describe('v', 'Displayes the version')
  .alias('v', 'version')
  .describe('s', 'Scan for iBeacons')
  .alias('s', 'scan')
  .describe('b', 'Broadcast as an iBeacon')
  .alias('b', 'broadcast')
  .describe('u', 'Proximity UUID')
  .alias('u', 'uuid')
  .describe('M', 'Major Identifier')
  .alias('M', 'major')
  .describe('m', 'Minor Identifier')
  .alias('m', 'minor')
  .describe('p', 'Advertised Power')
  .alias('p', 'power')
  .default('p', -32)
  .argv;

if (argv.version) {
  // TODO get version from package.json
  console.log('iBeacon version 0.0.2');
  process.exit();
}

if (argv.broadcast) {
  var uuid = argv.uuid ? argv.uuid : uuid.v4();
  var major = argv.major ? argv.major : 1;
  var minor = argv.minor ? argv.minor : 0;
  var measuredPower = argv.power;

  console.log('Starting broadcast with uuid: ' + uuid + ' major: '
  	+ major + ' minor: ' + minor + ' power: ' + measuredPower);
  Bleacon.startAdvertising(uuid, major, minor, measuredPower);
}

if (argv.scan) {

  Bleacon.on('discover', function(bleacon) {
    console.log('bleacon found: ' + JSON.stringify(bleacon));
  });

  var uuid = argv.uuid;
  var major = argv.major;
  var minor = argv.minor;

  if (uuid && major && minor) {
    console.log('Starting scan for uuid: ' + uuid + ' major: '
      + major + ' minor: ' + minor);
    Bleacon.startScanning(uuid, major, minor);
  } else if(uuid && major) {
    console.log('Starting scan for uuid: ' + uuid + ' major: '
      + major);
    Bleacon.startScanning(uuid, major);
  } else if(uuid) {
    console.log('Starting scan for uuid: ' + uuid);
    Bleacon.startScanning(uuid, major);
  } else {
    console.log('Starting scan');
    Bleacon.startScanning();
  }
}

if (argv.help || (!argv.scan && !argv.broadcast)) {
  console.log(optimist.help());
  process.exit();
}
