const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function parse_input(/** @type {string}*/ input) {
    const lines = input.split('\n');
    const regex = /(\w+)\D+(\d+) km\/s for (\d+).*rest for (\d+) seconds./;
    /** @type {Map<string,{fly_speed: number, fly_time: number, rest_time: number}>} */
    const reindeer = new Map();
    for (const line of lines) {
        const matches = line.match(regex);
        if (matches) {
            reindeer.set(matches[1],{fly_speed: parseInt(matches[2]), fly_time: parseInt(matches[3]), rest_time: parseInt(matches[4])});
        }
    }
    return reindeer;
}

module.exports.part_1 = ()=>{   
    const reindeer = parse_input(input);
    //console.log([...reindeer.entries()].map(v=>`${v[0]}: ${v[1].fly_speed}km/s fly speed / ${v[1].fly_time}s fly time / ${v[1].rest_time}s rest time`).join('\n'));
    
    const race_length = 2503;
    
    /** @type {Map<string,number>} */
    const distances = new Map();

    for (const key of reindeer.keys()) {
        //let is_flying = true;
        let distance = 0;
        const fly_time = reindeer.get(key).fly_time;
        const rest_time = reindeer.get(key).rest_time;
        const fly_speed = reindeer.get(key).fly_speed;
        
        for (let i=0;i<race_length;i++) {
            const place = i % (fly_time + rest_time);
            if (place < fly_time) {
                distance += fly_speed;
            }
        }
        distances.set(key,distance);
    }

    //console.log([...distances.entries()].map(v=>`${v[0]}: ${v[1]}`));
    
    let winner = '';
    for (const racer of distances.keys()) {
        if (winner == '') {
            winner = racer;
        }
        if (distances.get(racer) > distances.get(winner)) {
            winner = racer;
        }
    }

    console.log(`The winner is.. ${winner} at ${distances.get(winner)}km`);
}

module.exports.part_2 = ()=>{
    const reindeer = parse_input(input);
    //console.log([...reindeer.entries()].map(v=>`${v[0]}: ${v[1].fly_speed}km/s fly speed / ${v[1].fly_time}s fly time / ${v[1].rest_time}s rest time`).join('\n'));
    
    const race_length = 2503;
    
    /** @type {Map<string,number>} */
    const points = new Map();
    /** @type {Map<string,number>} */
    const distances = new Map();

    for (let i=0;i<race_length;i++) {
        for (const racer of reindeer.keys()) {
            const data = reindeer.get(racer);
            
            const place = i % (data.fly_time + data.rest_time);
            if (place < data.fly_time) {
                distances.set(racer,(distances.get(racer) ?? 0)+data.fly_speed);
            }
        }
        let first = '';
        for (const racer of distances.keys()) {
            if (first == '') {
                first = racer;
            }
            if (distances.get(racer) > distances.get(first)) {
                first = racer;
            }
        }
        points.set(first,(points.get(first) || 0) + 1);
    }

    //console.log([...distances.entries()].map(v=>`${v[0]}: ${v[1]}`));
    
    let winner = '';
    for (const racer of points.keys()) {
        if (winner == '') {
            winner = racer;
        }
        if (points.get(racer) > points.get(winner)) {
            winner = racer;
        }
    }

    console.log(`The winner is.. ${winner} with ${points.get(winner)} points!`);
    
    console.log([...points.entries()].map(v=>`${v[0]}: ${v[1]}`));
    console.log([...distances.entries()].map(v=>`${v[0]}: ${v[1]}`));
}