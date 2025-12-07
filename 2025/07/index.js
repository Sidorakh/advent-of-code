const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');
const Grid = require('../../utils/grid');
module.exports.part_1 = ()=>{
    const grid = new Grid(input.split('\n'));
    //console.log(grid.stringify());
    const beams = [];
    let splits = 0;

    let start_x = 0;
    let start_y = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == 'S') {
                start_x = x;
                start_y = y;
                break;
            }
        }
    }

    beams.push(start_x);
    for (let y=start_y;y<grid.height();y++) {
        for (let i=0;i<beams.length;i++) {
            const beam = beams[i];
            const char = grid.get(beam,y);
            if (char == '.' || char == 'S') {
                grid.set(beam,y,'|');
            }
            if (char == '^') {
                splits += 1;
                beams.splice(i,1);
                i-=1;
                if (!beams.includes(beam-1)) {
                    beams.push(beam-1);
                }
                if (!beams.includes(beam+1)) {
                    beams.push(beam+1);
                }
            }
        }
    }

    console.log(`Part 1: ${splits}`);
}

module.exports.part_2 = ()=>{
    const grid = new Grid(input.split('\n'));
    //console.log(grid.stringify());
    const beams = [];
    let splits = 0;

    let start_x = 0;
    let start_y = 0;
    for (let x=0;x<grid.width();x++) {
        for (let y=0;y<grid.height();y++) {
            if (grid.get(x,y) == 'S') {
                start_x = x;
                start_y = y;
                grid.set(x,y,'.');
                break;
            }
        }
    }

    
    const beam_numbers = new Array(grid.width());
    for (let i=0;i<grid.width();i++) {
        beam_numbers[i] = 0;
    }
    beam_numbers[start_x] = 1;
    for (let y=0;y<grid.height();y++) {
        for (let x=0;x<grid.width();x++) {
            const char = grid.get(x,y);
            if (beam_numbers[x] > 0) {
                if (char == '^') {
                    beam_numbers[x-1] += beam_numbers[x];
                    beam_numbers[x+1] += beam_numbers[x];
                    beam_numbers[x] = 0;
                    splits += 1;
                }
            }
        }
    }

    console.log(`Part 2: ${beam_numbers.reduce((acc,v)=>acc+v)}`);
    //console.log(splits); <- works for part 1, who knew

}
