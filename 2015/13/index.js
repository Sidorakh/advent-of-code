const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

const relationship_entry = (a,b)=> a<b ? `${a}-${b}` : `${b}-${a}`;

const permutator = (/** @type {string[][]} */ input) => {
    const result = [];
    const permute = (arr, m = []) => {
        if (arr.length == 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                const curr = arr.slice();
                const next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
  
    permute(input)
    
    return result;
}

function parse_input(input) {
    const lines  = input.split('\n');
    /** @type {Map<string,number>} */
    const relationships = new Map();
    /** @type {Set<string>} */
    const people = new Set();

    const regex = /^(\w+).*(gain|lose) (\d+).* to (\w+)/;

    for (const line of lines) {
        const matches = line.match(regex);
        if (matches) {
            people.add(matches[1]);
            people.add(matches[4]);
            const key = `${matches[1]}-${matches[4]}`;
            let points = parseInt(matches[3]);
            if (matches[2] == "lose") {
                points *= -1;
            }

            relationships.set(key,points);
        }

    }

    return {
        people,
        relationships
    }
}

module.exports.part_1 = ()=>{
    const {people,relationships} = parse_input(input);
    let total = 0;
    let max = -Infinity;
    let permutations = permutator([...people.values()]);

    for (const permutation of permutations) {
        let running_total = 0;
        // console.log('\n\n');
        for (let i=0;i<permutation.length;i++) {
            let prev = i-1 < 0 ? permutation.length-1 : i-1;
            const a = permutation[prev];
            const b = permutation[i];
            running_total += relationships.get(`${a}-${b}`);
            running_total += relationships.get(`${b}-${a}`);

            // console.log(`${a} to ${b}: ${relationships.get(`${a}-${b}`)}`);
            // console.log(`${b} to ${a}: ${relationships.get(`${b}-${a}`)}`);

        }
        if (running_total > max) {
            max = running_total;
            total = running_total;
        }
    }

    console.log(`Optimal happiness change: ${total}`);
}

module.exports.part_2 = ()=>{
    const list = parse_input(input).people;

    const lines = [];
    for (const person of (list.values())) {
        lines.push(`Sidorakh would gain 0 happiness unitd by sitting next to ${person}`);
        lines.push(`${person} would gain 0 happiness units by sitting next to Sidorakh`);
    }
    const new_input = input + '\n' + lines.join('\n');

    const {people,relationships} = parse_input(new_input);



    let total = 0;
    let max = -Infinity;
    let permutations = permutator([...people.values()]);

    for (const permutation of permutations) {
        let running_total = 0;
        // console.log('\n\n');
        for (let i=0;i<permutation.length;i++) {
            let prev = i-1 < 0 ? permutation.length-1 : i-1;
            const a = permutation[prev];
            const b = permutation[i];
            running_total += relationships.get(`${a}-${b}`);
            running_total += relationships.get(`${b}-${a}`);

            // console.log(`${a} to ${b}: ${relationships.get(`${a}-${b}`)}`);
            // console.log(`${b} to ${a}: ${relationships.get(`${b}-${a}`)}`);

        }
        if (running_total > max) {
            max = running_total;
            total = running_total;
        }
    }

    console.log(`Optimal happiness change: ${total}`);
    

}