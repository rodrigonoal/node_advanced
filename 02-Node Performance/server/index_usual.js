const express = require('express');

const app = express();

// the purpose of this function is
// to do as much work as possible
// for a set amount of time (duration)
const doWork = (duration) => {
	const start = Date.now();
	while (Date.now() - start < duration) {}
};

// USUAL WAY:
// this one locks the server on the single thread
app.get('/', (req, res) => {
	doWork(5000);
	res.send('Hi there');
});

const port = 3000;
app.listen(port, () => {
	console.log(`localhost:${port}`);
});
