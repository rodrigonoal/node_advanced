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

// to start this on pm2 cluster manager
// -i (instances) 0 (set to the amount of cores i have)
// pm2 start index_pm2.js -i 0

// pm2 list - list instances
// pm2 show index_pm2 - detailed information
// pm2 monit - dashboard
// pm2 delete index_pm2 - stop all