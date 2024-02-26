const {logger} = require('../logger');
const axios = require('axios');
const fs = require('fs');
const pressurizeNetwork = async ()=> {
    const outputFilename = 'outputNetwork.txt'
    const milliSecs = 50;
    var start = Date.now();
    async function callApi() {
        const url = `https://api.publicapis.org/entries`;
        const config = {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        logger.info(`Getting data from ${url} at: ${Date.now()}`);
        //Go get a joke
        const response = await axios({
            url: url,
            method: 'get',
            headers: config.headers
        }).catch(e => {
            logger.error(e.message);
        });
        let msg =`No data received from ${url}`
        try {
            if (response.data) {
                msg = `Received from ${url}: ${JSON.stringify(response.data)}`
            }
        } catch (e) {
            logger.error(e.message)
        }
        logger.info(msg)
        await fs.promises.appendFile(outputFilename, msg)
            .catch(e => {
                logger.error(e.message)
            })
    }
    for(;;){
        var stop = Date.now();
        if (stop-start > 300000){
            break;
        }
        await callApi();
    }
}


module.exports = {pressureNetwork: pressurizeNetwork};
