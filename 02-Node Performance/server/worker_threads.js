const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/', (req, res) => {
	const worker = new Worker('./worker.js');

	worker.on('message', (data) => {
		res.send(data);
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`localhost:${port}`);
});
