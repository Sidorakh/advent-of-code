const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function get_powerset(arr) {
    const ps = [[]];
    for (let i=0; i < arr.length; i++) {
        for (let j = 0, len = ps.length; j < len; j++) {
            ps.push(ps[j].concat(arr[i]));
        }
    }
    return ps;
}

module.exports.part_1 = ()=>{
    const target = 150;
    const containers = input.split('\n').map(v=>parseInt(v));

    const powerset = get_powerset(containers);

    let total = 0;
    for (const set of powerset) {
        const sum = set.reduce((v,acc)=>acc+v,0);
        // console.log(sum);
        if (sum == target) {
            total += 1;

        }
    }

    console.log(`${total} combinations found\n${powerset.length}`)
}

module.exports.part_2 = ()=>{
    const target = 150;
    const containers = input.split('\n').map(v=>parseInt(v));

    const powerset = get_powerset(containers);

    let min = containers.length;
    let total = 0;
    for (const set of powerset) {
        const sum = set.reduce((v,acc)=>acc+v,0);
        // console.log(sum);
        if (sum == target) {
            //total += 1;
            if (set.length < min) {
                min = set.length;
                total = 0;
            }
            if (set.length == min) {
                total += 1;
            }

        }
    }

    console.log(`${total} combinations found\n${min}`)
}