const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8').split('\n').map(v=>v.split(',').map(n=>parseInt(n))).map(v=>({x: v[0],y: v[1]}));
const Grid = require('../../utils/grid');
module.exports.part_1 = ()=>{
    const points = input;
    let area = 0;
    for (let i=0;i<points.length;i++) {
        const a = points[i];
        for (let j=i;j<points.length;j++) {
            const b = points[j];
            const width = Math.abs(a.x-b.x)+1;
            const height = Math.abs(a.y-b.y)+1;
            if (area < width*height) {
                area = width*height;
            }
        }
    }
    
    console.log(`Part 1: ${area}`);
}

/** 
 * @typedef {Object} Line
 * @property {"horizontal"|"vertical"} orientation
 * @property {number} x1
 * @property {number} y1
 * @property {number} x2
 * @property {number} y2
 */
module.exports.part_2 = ()=>{
    const points = input;
    let max_x = 0;
    let max_y = 0;
    let area = 0;
    /** @type {Line[]} */
    const lines = [];
    for (const point of points) {
        if (point.x > max_x) {
            max_x = point.x;
        }
        if (point.y > max_y) {
            max_y = point.y;
        }
    }
    for (let i=0;i<points.length;i++) {
        const a = points[i];
        const b = points[i+1 == points.length ? 0 : i+1];
        if (a.x == b.x) {
            // vertical
            const max = Math.max(a.y,b.y);
            const min = Math.min(a.y,b.y);
            lines.push({
                orientation: 'vertical',
                x1: a.x,
                y1: min,
                x2: a.x,
                y2: max,
            });
            
        }
        if (a.y == b.y) {
            // horizontal
            const max = Math.max(a.x,b.x);
            const min = Math.min(a.x,b.x);
            lines.push({
                orientation: 'horizontal',
                x1: min,
                y1: a.y,
                x2: max,
                y2: a.y,
            });
            
        }
    }


    for (let i=0;i<points.length;i++) {
        const a = points[i];
        for (let j=i;j<points.length;j++) {
            const b = points[j];
            const width = Math.abs(a.x-b.x)+1;
            const height = Math.abs(a.y-b.y)+1;
            const rx_min = Math.min(a.x,b.x);
            const rx_max = Math.max(a.x,b.x);
            const ry_min = Math.min(a.y,b.y);
            const ry_max = Math.max(a.y,b.y);
            let intersecting = false;
            for (const line of lines) {
                if (line_rectangle_intersection(line.x1,line.y1,line.x2,line.y2,rx_min+1,ry_min+1,rx_max-1,ry_max-1)) {
                    intersecting = true;
                }
                
            }
            if (intersecting == false) {
                if (area < width*height) {
                area = width*height;
                }
            }
        }
    }

    //console.log(JSON.stringify(lines,null,4));
    //console.log(grid.stringify());
    console.log(`Part 2: ${area}`);
}

function line_line_intersection(x1,y1,x2,y2,x3,y3,x4,y4) {
    const ua = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const ub = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        return true;
    }
    return false;
}

function line_rectangle_intersection(lx1,ly1,lx2,ly2,rx1,ry1,rx2,ry2) {
    const left = line_line_intersection(lx1,ly1,lx2,ly2,rx1,ry1,rx1,ry2);
    const right = line_line_intersection(lx1,ly1,lx2,ly2,rx2,ry1,rx2,ry2);
    const top = line_line_intersection(lx1,ly1,lx2,ly2,rx1,ry1,rx2,ry1);
    const bottom = line_line_intersection(lx1,ly1,lx2,ly2,rx1,ry2,rx2,ry2);

    if (left || top || right || bottom) {
        return true;
    }
    return false;
}
