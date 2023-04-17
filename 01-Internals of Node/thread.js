// this file shows how libuv can create threads for heavy calculations

// we can manipulate the number of threads:
process.env.UV_THREADPOOL_SIZE = 4;

const { pbkdf2 } = require('crypto');

const start = Date.now();

// pbkdf2 is a heavy function, so we can benchmark node's efficiency

for (let i = 1; i <= 5; i++) {
	pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
		console.log(`${i}: `, Date.now() - start);
	});
}

// result:
// sometimes one function will finish before the other
// they are executed on the background, by the C++ side
// the fith function takes longer because node creates only
// 4 aditional threads
