# How Node Works

V8 - Runs Javascript
Libuv - Accesses the filesystem and some aspects of concurrency

The js side of Node: https://github.com/nodejs/node/tree/main/lib
Calls a C++ implementation: https://github.com/nodejs/node/tree/main/src

## Single Thread

Node Event Loop is single threaded, but some of Node Framework/Standart Lib. is not single threaded. (see thread.js). With libuv node can run 4 threads to offload expensive calculations.6


## Event Loop example:

```javascript
const pendingTimers = [];
const pendingOSTasks = []; // tasks like http requests, dealt by the underlying OS
const pendingOperations = []; // tasks running on threadpool

// New timers, tasks, ops are recorded from myFile running
myFile.runContents();

function shouldContinue() {
	// Check 1: Any pending setTimeout, setInterval or setImmediate
	// Check 2: Any pending OS tasks? (listening to a port)
	// Check 3: Any pending long running operations? (fs module)
	return (
		pendingTimers.length ||
		pendingOSTasks.length ||
		pendingOperations.length
	);
}

// entire body executes in one tick
while (shouldContinue()) {
	// 1: Node examines pendingTimers and executes callbacks (setTimeout, setInterval)
	// 2: Node examines pendingOSTasks and executes callbacks
	// 3: Node pauses execution. COntinue when...
	//      - a pendingOSTask is done
	//      - a new pendingOperation is done
	//      - a timer is about to complete
	// 4: Node examines pendingTimers and executes callbacks (setImmediate)
	// 5: Handle any 'close' events (cleanup code)
}

// exit back to terminal
```
