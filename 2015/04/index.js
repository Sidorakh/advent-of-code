const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');


module.exports.part_1 = ()=>{
    let num = 0;
    while (true) {
        const hash = crypto.createHash('md5').update(`${input}${num}`).digest('hex');
        if (hash.startsWith('00000')) break;
        num+=1;
    }
    console.log(`Suffix: ${num}`)
}

module.exports.part_2 = ()=>{
    let num = 0;
    while (true) {
        const hash = crypto.createHash('md5').update(`${input}${num}`).digest('hex');
        if (hash.startsWith('000000')) break;
        num+=1;
    }
    console.log(`Suffix: ${num}`)
}