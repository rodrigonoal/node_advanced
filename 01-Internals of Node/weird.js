const { readFile } = require('fs');
const { request } = require('https');
const { pbkdf2 } = require('crypto');
const { now } = Date;

const start = now();
const logTime = (name) => console.log(`${name}: `, now() - start);

const doRequest = () => {
	request('https://www.google.com', (res) => {
		res.on('data', () => {});
		res.on('end', () => logTime('Request'));
	}).end();
};

const doHash = (index) => {
	pbkdf2('a', 'b', 10000, 512, 'sha512', () => logTime(`Hash ${index}`));
};

doRequest(); // using OS

readFile('weird.js', 'utf8', () => logTime('FS')); // using threadpool

for (let i = 1; i <= 4; i++) doHash(i); // using threadpool

// In fact readFile has more than one "task",
// so Node finishes executing some of the work on the hashes
// before returning to FS

// HOW FS WORKS:
// We call readFile
// Node gets some stats on the file
// HD acessed, stats returned
// Node requests to read the file
// HD acessed, file contents streamed back to app
// Node returns the content to us
