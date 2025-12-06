const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function parse_input(/** @type {string} */ input) {
    const lines = input.split('\n');
    /** @type {{children?: number, cats?: number, samoyeds?: number, pomeranians?: number, akitas?: number, vizslas?: number, goldfish?: number, trees?: number, cars?: number, perfumes?: number}[]} */
    const sues = [];

    for (const line of lines) {
        const [lhs,rhs] = line.split(/:(.*)/);
        const sue = {
            children: undefined,
            cats: undefined,
            samoyeds: undefined,
            pomeranians: undefined,
            vizslas: undefined,
            goldfish: undefined,
            trees: undefined,
            cars: undefined,
            perfumes: undefined,
        }
        const data = rhs.split(',').map(v=>v.trim()).map(v=>v.split(':').map(v=>v.trim()));
        for (const point of data) {
            sue[point[0]] = parseInt(point[1]);
        }
        sues.push(sue);
    }
    return sues;
}

module.exports.part_1 = ()=>{
    const sues = parse_input(input);

    const target = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    };

    let likely_score = -1;
    let likely_index = 0;
    for (let i=0;i<sues.length;i++) {
        const sue = sues[i];
        let score = 0;
        for (const key of Object.keys(sue)) {
            if (target[key] == sue[key]) {
                score += 1;
            }
        }
        if (score > likely_score) {
            likely_score = score;
            likely_index = i;
        }
    }

    console.log(`Most liekly: ${likely_index+1}`)
}

module.exports.part_2 = ()=>{
    const sues = parse_input(input);

    const target = {
        children: {
            value: 3,
            type: '='
        },
        cats: {
            value: 7,
            type: '>'
        },
        samoyeds: {
            value: 2,
            type: '='
        },
        pomeranians: {
            value: 3,
            type: '<'
        },
        akitas: {
            value: 0,
            type: '='
        },
        vizslas: {
            value: 0,
            type: '=',
        },
        goldfish: {
            value: 5,
            type: '<'
        },
        trees: {
            value: 3,
            type: '>'
        },
        cars: {
            value: 2,
            type: '='
        },
        perfumes: {
            value: 1,
            type: '='
        }
    };

    let likely_score = -1;
    let likely_index = 0;
    for (let i=0;i<sues.length;i++) {
        const sue = sues[i];
        let score = 0;
        for (const key of Object.keys(sue)) {
            if (target[key].type == '=') {
                if (sue[key] == target[key].value) {
                    score += 1;
                }
            }
            if (target[key].type == '>') {
                if (sue[key] > target[key].value) {
                    score += 1;
                }
            }
            if (target[key].type == '<') {
                if (sue[key] < target[key].value) {
                    score += 1;
                }
            }
        }
        if (score > likely_score) {
            likely_score = score;
            likely_index = i;
        }
    }

    console.log(`Most liekly: ${likely_index+1}`)
}