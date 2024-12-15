const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    let num = 40;
    let string = input;
    for (let i=0;i<num;i++) {
        let newstr = '';
        const matches = string.match(/(\d)\1*/g);
        for (const match of matches) {
            newstr += `${match.length}${match[0]}`
        }
        //console.log(newstr);
        string = newstr;
    }

    console.log(`Length: ${string.length}`);
}

module.exports.part_2 = ()=>{
    let num = 50;
    let string = input;
    for (let i=0;i<num;i++) {
        let newstr = '';
        const matches = string.match(/(\d)\1*/g);
        for (const match of matches) {
            newstr += `${match.length}${match[0]}`
        }
        //console.log(newstr);
        string = newstr;
    }

    console.log(`Length: ${string.length}`);
}