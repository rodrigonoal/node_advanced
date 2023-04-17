const cluster = require('node:cluster');

// Is the file being executed in primary mode?
if (cluster.isPrimary) {
	// Cause index.js to be executed again, but in child mode
	cluster.fork();
} else {
	// Child mode default execution:
	const express = require('express');

	const app = express();

	const doWork = (duration) => {
		const start = Date.now();
		while (Date.now() - start < duration) {}
	};

	app.get('/', (req, res) => {
		doWork(5000);
		res.send('Hi there');
	});

	app.get('/fast', (req, res) => {
		res.send('This was fast!');
	});

	const port = 3000;
	app.listen(port, () => {
		console.log(`localhost:${port}`);
	});
}
