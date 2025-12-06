const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8').split('\n');

module.exports.part_1 = ()=>{
    const max = [];
    for (const line of input) {
        let pos = 0;
        let numbers = [0,0];
        for (let i=0;i<numbers.length;i++) {
            for (let n=pos;n<line.length-((numbers.length-1)-i);n++) {
                let num = parseInt(line[n]);
                if (num > numbers[i]) {
                    numbers[i] = num;
                    pos = n+1;
                }
            }
        }
        max.push(numbers.join(''));
    }
    ///console.log(max.join('\n'));
    console.log(`Sum: ${max.map(v=>parseInt(v)).reduce((v,acc)=>v+acc)}`);
}

module.exports.part_2 = ()=>{
    const max = [];
    for (const line of input) {
        let pos = 0;
        let numbers = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i=0;i<numbers.length;i++) {
            for (let n=pos;n<line.length-((numbers.length-1)-i);n++) {
                let num = parseInt(line[n]);
                if (num > numbers[i]) {
                    numbers[i] = num;
                    pos = n+1;
                }
            }
        }
        max.push(numbers.join(''));
    }
    ///console.log(max.join('\n'));
    console.log(`Sum: ${max.map(v=>parseInt(v)).reduce((v,acc)=>v+acc)}`);
}