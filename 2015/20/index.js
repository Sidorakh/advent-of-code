const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const num = parseInt(input);
    const houses = [];
    for (let i=1;i<num/10;i++) {
        for (let j=i;j<num/10;j++) {
            if (houses[j] == undefined) {
                houses[j] = 0;
            }
            houses[j] += i*10;
        }
    }

    for (let i=0;i<houses.length;i++) {
        if (houses[i] > num) {
            console.log(`House ${i+1}`);
            break;
        }
    }
}

module.exports.part_2 = ()=>{

}