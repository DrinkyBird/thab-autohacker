const io = require('socket.io-client');
const request = require('request');
const util = require('util');

const socket = io('https://tohellandback.herokuapp.com/');
let g_ip;
let hacks = 0;

socket.on('error', (e) => {
	console.log('Error!');
	console.log(util.inspect(e));
	process.exit(1);
});

socket.on('disconnect', (reason) => {
	console.log('Disconnected: %s', reason);
	process.exit(1);
});

function hack() {
	socket.emit('hack', {
		ip: g_ip,
		city: 'London',
		country: 'United Kingdom'
	});
	
	hacks++;
	
	console.log('Hacked (%d)', hacks);
}

function run() {
	setTimeout(() => {
		hack();
		run();
	}, 100);
}

request('https://api.ipify.org/', (e, r, b) => {
	g_ip = b;
	
	console.log('Using IP %s', g_ip);
	
	run();
});