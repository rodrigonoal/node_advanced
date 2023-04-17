// restricting the threadpool for each child
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('node:cluster');

if (cluster.isPrimary) {
	// every fork creates a new child
	// the n of children should match
	// the n of physical / logical cores
	let myCores = 16;

	while (myCores > 0) {
		cluster.fork();
		myCores--;
	}
} else {
	const { pbkdf2 } = require('crypto');
	const express = require('express');

	const app = express();

	app.get('/', (req, res) => {
		const start = Date.now();

		pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
			res.send(`Hi. This took: ${Date.now() - start}`);
		});
	});

	app.get('/fast', (req, res) => {
		res.send('This was fast!');
	});

	const port = 3000;
	app.listen(port, () => {
		console.log(`localhost:${port}`);
	});
}
