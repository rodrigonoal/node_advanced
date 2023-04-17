// this file shows how Node uses the underlying OS

const { request } = require('https');
const { now } = Date;
const start = now();

const doRequest = () => {
	request('https://www.google.com', (res) => {
		res.on('data', () => {});
		res.on('end', () => {
			console.log(now() - start);
		});
	}).end();
};

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

// all functions take mostly the same time
// these tasks are delegated to the underlying OS
