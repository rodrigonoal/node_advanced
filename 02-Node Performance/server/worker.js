const { parentPort } = require('worker_threads');

const start = Date.now();

let counter = 0;

while (counter < 1e9) {
	counter++;
}

parentPort.postMessage(`Counted it: ${counter}. Took: ${Date.now() - start}ms`);
