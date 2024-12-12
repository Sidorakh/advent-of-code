const fs = require('fs');
const path = require('path');
const Grid = require('../../utils/grid.js');

const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const width = 1000;
    const height = 1000;
    const arr = [];
    for (let i=0;i<width;i++) {
        arr[i] = [];
        for (let j=0;j<height;j++) {
            arr[i][j] = 0;
        }
    }
    const grid = new Grid(arr);

    const instructions = input.split('\n');
    for (const step of instructions) {
        if (step.trim().length == 0) continue;
        let type = 'toggle';
        if (step.startsWith('turn on')) {
            type = 'on';
        }
        if (step.startsWith('turn off')) {
            type = 'off';
        }
        const range = step.match(/(?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/).groups;
        const x1 = parseInt(range.x1);
        const y1 = parseInt(range.y1);
        const x2 = parseInt(range.x2);
        const y2 = parseInt(range.y2);

        for (let x=x1;x<=x2;x++) {
            for (let y=y1;y<=y2;y++) {
                if (type == 'toggle') {
                    grid.set(x,y,grid.get(x,y) == 1? 0 : 1);
                } else if (type == 'on') {
                    grid.set(x,y,1);
                } else if (type == 'off') {
                    grid.set(x,y,0);
                }
            }
        }
    }

    let lights = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == 1) lights++;
        }
    }

    console.log(`${lights} lights on`);
}

module.exports.part_2 = ()=>{
    const width = 1000;
    const height = 1000;
    const arr = [];
    for (let i=0;i<width;i++) {
        arr[i] = [];
        for (let j=0;j<height;j++) {
            arr[i][j] = 0;
        }
    }
    const grid = new Grid(arr);

    const instructions = input.split('\n');
    for (const step of instructions) {
        if (step.trim().length == 0) continue;
        let type = 'toggle';
        if (step.startsWith('turn on')) {
            type = 'on';
        }
        if (step.startsWith('turn off')) {
            type = 'off';
        }
        const range = step.match(/(?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/).groups;
        const x1 = parseInt(range.x1);
        const y1 = parseInt(range.y1);
        const x2 = parseInt(range.x2);
        const y2 = parseInt(range.y2);

        for (let x=x1;x<=x2;x++) {
            for (let y=y1;y<=y2;y++) {
                const val = grid.get(x,y);
                if (type == 'toggle') {
                    grid.set(x,y,val + 2);
                } else if (type == 'on') {
                    grid.set(x,y,val + 1);
                } else if (type == 'off') {
                    grid.set(x,y,Math.max(val - 1,0));
                }
            }
        }
    }

    let brightness = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            brightness += grid.get(x,y);
        }
    }

    console.log(`Brightness: ${brightness}`);
}