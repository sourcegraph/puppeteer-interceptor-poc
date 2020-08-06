# puppeteer-interceptor POC

Given the following contexts:
- A script running in the main thread of a browser tab
- A script running in a WebWorker in a browser tab
- A script running in the background page of a browser extension

This project contains a proof of concept of using [a fork of jsoverson/puppeteer-interceptor](https://github.com/jsoverson/puppeteer-interceptor/pull/1) to:
- Intercept and fulfill requests sent from all contexts
- Intercept and edit responses received in all contexts

`src/index.ts` defines a small Puppeteer script that will:
- Intercept and immediately fulfill requests to `data.txt`
- Let requests to `data2.txt` passthrough to the server, but edit the response prior to completing the request

To run this script, run `yarn pup`.

`testpage` contains a small webpage that will make requests to `data.txt` and `data2.txt`, both from the main thread and from a web worker. To serve this page, run `yarn serve`.

`my-browser-ext` defines a small browser extension that will make requests to `data.txt` and `data2.txt`. This browser extension will be loaded when running `src/index.ts`.
