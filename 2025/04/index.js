const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8').split('\n');
const Grid = require('../../utils/grid');
module.exports.part_1 = ()=>{
    const grid = new Grid(input);
    let accessible = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == '@') {
                let num = 0;
                for (let xo=-1;xo<=1;xo++) {
                    for (let yo=-1;yo<=1;yo++) {
                        if (xo == 0 && yo == 0) continue;
                        const cx = x + xo;
                        const cy = y + yo;
                        const v = grid.get(cx,cy);
                        if (v == '@') {
                            num += 1;
                        }
                    }
                }
                if (num < 4) {
                    accessible += 1;
                }

            }
        }
    }
    console.log(`Rolls: ${accessible}`);
}

module.exports.part_2 = ()=>{
    const grid = new Grid(input);
    let points = [];
    let start_total = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.width();y++) {
            if (grid.get(x,y) == '@') {
                start_total += 1;
            }
        }
    }
    do {
        points = [];
        
        for (let x=0;x<grid.width();x++) {
            for (let y=0;y<grid.height();y++) {
                if (grid.get(x,y) == '@') {
                    let num = 0;
                    for (let xo=-1;xo<=1;xo++) {
                        for (let yo=-1;yo<=1;yo++) {
                            if (xo == 0 && yo == 0) continue;
                            const cx = x + xo;
                            const cy = y + yo;
                            const v = grid.get(cx,cy);
                            if (v == '@') {
                                num += 1;
                            }
                        }
                    }
                    if (num < 4) {
                        points.push({x,y});
                    }

                }
            }
        }
        //console.log(`Removing ${points.length} point${points.length == 1 ? '' : 's'}`);
        for (const point of points) {
            grid.set(point.x,point.y,'.');
        }
    } while (points.length > 0) 
    let end_total = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.width();y++) {
            if (grid.get(x,y) == '@') {
                end_total += 1;
            }
        }
    }
    console.log(`Removed a total of ${start_total-end_total} rolls`);
}