const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');
const Grid = require('../../utils/grid.js');

module.exports.part_1 = ()=>{
    // is this conways game of life?
    let grid = new Grid(input.split('\n'));

    const steps = 100;


    for (let i=0;i<steps;i++) {
        const new_grid = Grid.create(grid.width(),grid.height());
        for (let x=0;x<grid.width();x++) {
            for (let y=0;y<grid.height();y++) {
                new_grid.set(x,y,'.');
                let neighbours = 0;
                for (let ox=-1;ox<=1;ox++) {
                    for (let oy=-1;oy<=1;oy++) {
                        if (x + ox < 0 | y + oy < 0 || x + ox >= grid.width() || y + oy >= grid.height()) {
                            continue;
                        }
                        if (ox == 0 && oy == 0) {
                            continue;
                        }
                        if (grid.get(x+ox,y+oy) == '#') {
                            neighbours += 1;
                        }
                    }
                }
                const light = grid.get(x,y);
                if (light == '#') {
                    if (neighbours >= 2 && neighbours <= 3) {
                        new_grid.set(x,y,'#');
                    } else {
                        new_grid.set(x,y,'.');
                    }
                }
                if (light == '.') {
                    if (neighbours == 3) {
                        new_grid.set(x,y,'#');
                    } else {
                        new_grid.set(x,y,'.');
                    }
                }
            }
        }
        grid = new_grid;
    }
    
    let total = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == '#') {
                total += 1;
            }
        }
    }
    console.log(`Total: ${total}`);
}

module.exports.part_2 = ()=>{
    // is this conways game of life?
    let grid = new Grid(input.split('\n'));

    const steps = 100;

    grid.set(0,0,'#');
    grid.set(grid.width()-1,grid.height()-1,'#');
    grid.set(0,grid.height()-1,'#');
    grid.set(grid.width()-1,0,'#');

    for (let i=0;i<steps;i++) {
        const new_grid = Grid.create(grid.width(),grid.height());
                
        new_grid.set(0,0,'#');
        new_grid.set(grid.width()-1,grid.height()-1,'#');
        new_grid.set(0,grid.height()-1,'#');
        new_grid.set(grid.width()-1,0,'#');
        for (let x=0;x<grid.width();x++) {
            for (let y=0;y<grid.height();y++) {
                if ((x == 0 && y == 0) || (x == 0 && y == grid.height()-1) || (x == grid.width()-1 && y == 0) || (x == grid.width()-1 && y == grid.height()-1)) continue;
                new_grid.set(x,y,'.');
                let neighbours = 0;
                for (let ox=-1;ox<=1;ox++) {
                    for (let oy=-1;oy<=1;oy++) {
                        if (x + ox < 0 | y + oy < 0 || x + ox >= grid.width() || y + oy >= grid.height()) {
                            continue;
                        }
                        if (ox == 0 && oy == 0) {
                            continue;
                        }
                        if (grid.get(x+ox,y+oy) == '#') {
                            neighbours += 1;
                        }
                    }
                }
                const light = grid.get(x,y);
                if (light == '#') {
                    if (neighbours >= 2 && neighbours <= 3) {
                        new_grid.set(x,y,'#');
                    } else {
                        new_grid.set(x,y,'.');
                    }
                }
                if (light == '.') {
                    if (neighbours == 3) {
                        new_grid.set(x,y,'#');
                    } else {
                        new_grid.set(x,y,'.');
                    }
                }
            }
        }
        grid = new_grid;
    }
    
    let total = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == '#') {
                total += 1;
            }
        }
    }
    console.log(`Total: ${total}`);
}