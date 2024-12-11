const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    let floor = 0;
    for (const char of input) {
        if (char == '(') floor += 1;
        if (char == ')') floor -= 1;
    }
    console.log(`Floor: ${floor}`);
}

module.exports.part_2 = ()=>{
    let floor = 0;
    let num = 0;
    for (const char of input) {
        num += 1;
        if (char == '(') floor += 1;
        if (char == ')') floor -= 1;
        if (floor == -1) {
            break;
        }
    }
    console.log(`Char: ${num}`);

}