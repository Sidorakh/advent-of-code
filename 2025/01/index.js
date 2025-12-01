const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8').split('\n');

module.exports.part_1 = ()=>{
    let dial = 50;
    const dial_max = 99;
    const dial_min = 0;

    let total = 0;
    for (const line of input) {
        const dir = line[0];
        const num = parseInt(line.slice(1));
        if (dir == 'L'){
            dial -= num;
        } else {
            dial += num;
        }
        dial = dial % 100;
        if (dial == 0) {
            total += 1;
        }
    }

    console.log(`Dial is at ${dial}\nNumber of 0's: ${total}`);
}

module.exports.part_2 = ()=>{
    let dial = 50;
    const dial_max = 99;
    const dial_min = 0;

    let total = 0;
    for (const line of input) {
        const dir = line[0];
        const num = parseInt(line.slice(1));
        let add = 1;
        let hit_zero  = false;
        if (dir == 'L'){
            add = -1;
        }
        for (let i=0;i<num;i++) {
            dial += add;
            dial = (dial + (dial_max+1)) % (dial_max+1);
            if (dial == 0) {
                total += 1;
                hit_zero = true;
            }
        }
        //console.log(`${line}: ${dial}: ${hit_zero}`);
    }

    console.log(`Dial is at ${dial}\nNumber of 0's: ${total}`);
}