const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function coord(x,y) {
    return `${x}/${y}`
}

module.exports.part_1 = ()=>{
    const map = new Map();
    let x = 0;
    let y = 0;
    map.set(coord(x,y),1);
    for (const char of input) {
        if (char == '^') {
            y -= 1;
        }
        if (char == 'v') {
            y += 1;
        }
        if (char == '<') {
            x -= 1;
        }
        if (char == '>') {
            x += 1;
        }
        map.set(coord(x,y),(map.get(coord(x,y)) || 0) + 1);
    }
    console.log(`Houses: ${map.size}`);
}

module.exports.part_2 = ()=>{
    const santa = {
        x: 0,
        y: 0,
    };
    const robot = {
        x: 0,
        y: 0,
    }
    const map = new Map();
    map.set(coord(0,0),1);
    let flip = 0;
    for (const char of input) {
        let target = santa;
        if (flip % 2 == 1) {
            target = robot;
        }

        if (char == '^') {
            target.y -= 1;
        }
        if (char == 'v') {
            target.y += 1;
        }
        if (char == '<') {
            target.x -= 1;
        }
        if (char == '>') {
            target.x += 1;
        }
        map.set(coord(target.x,target.y),(map.get(coord(target.x,target.y)) || 0) + 1);
        flip += 1;
    }

    console.log(`Houses: ${map.size}`);
}