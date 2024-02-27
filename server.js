require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const {logger} = require("./logger");
const {pressureNetwork} = require('./pressurizers/network');
const {pressureCpu} = require('./pressurizers/cpu')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 8080;

let omitCpu = false;
let omitNetwork = false;

if(typeof process.env.OMIT_CPU === 'string'){
    omitCpu = process.env.OMIT_CPU.toLowerCase()  === 'true';
};

if(typeof process.env.OMIT_NETWORK === 'string'){
    omitCpu = process.env.OMIT_NETWORK.toLowerCase()  === 'true';
};


const promises = [];

if(!omitCpu)promises.push(pressureCpu());
if(!omitNetwork)promises.push(pressureNetwork());


let promiseExecution = async () => {
    logger.info('Adding promises')
    let promise = await Promise.all(promises);
    promise.close();
};

server = app.listen(port, () => {
    logger.info(`Node server is running on port ${port} at ${new Date()}`);
    logger.info('Starting pressure')
    promiseExecution();
});


process.on('SIGTERM', function onSigterm () {
    console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
    // start graceul shutdown here
    shutdown()
  })

function shutdown() {
    server.close(function onServerClosed (err) {
        if (err) {
        console.error(err)
        process.exit(1)
        }

        closeMyResources(function onResourcesClosed (err) {
        // error handling
        process.exit()
        })
    })
}