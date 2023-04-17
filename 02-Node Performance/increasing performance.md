# How to increase Node performance

There are two ways of increasing Node Performance:
- Recommended: Use Node in "Cluster" Mode
- Experimental: Use Worker Threads

Worker threads are designed to allow Node.js to execute JavaScript in parallel, using separate threads that operate independently of the main event loop. They are well-suited for CPU-intensive tasks, such as image processing or machine learning algorithms. Worker threads are typically more lightweight and easier to manage than clusters, and they can be more efficient for applications that require parallel execution of JavaScript code.

On the other hand, clusters are designed to allow Node.js to scale horizontally across multiple CPU cores, by forking multiple instances of the same application and distributing the workload among them. Clusters are well-suited for applications that require high concurrency and can benefit from running multiple instances of the same code in parallel. Clusters are typically more complex and require more management overhead than worker threads.

In general, if your application is I/O-bound, meaning it spends most of its time waiting for I/O operations to complete (e.g. database queries, network requests, file system access), then clusters are likely to be more effective at improving performance. If your application is CPU-bound, meaning it spends most of its time performing CPU-intensive calculations, then worker threads may be more effective.