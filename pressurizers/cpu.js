const {logger} = require("../logger");
const fs = require('fs');
const isPrimeSync = (num) =>{
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}
const outputFilename = 'outputCpu.txt'
const start = Date.now();

const pressurizeCpu = async ()=> {
    let i = 0;
    for(;;){
        var stop = Date.now();
        if(stop-start > 300000){
            break;
        }
        if(isPrimeSync(i)){
            logger.info(`Elasped time: ${stop-start}`);
            const msg = `${i} is prime`;
            logger.info(msg);
            await fs.promises.appendFile(outputFilename, msg)
                .catch(e => {
                    logger.error(e.message)
                })
        }i++;
    }
}

module.exports = {pressureCpu: pressurizeCpu}
