const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

const map_entry = (a,b)=> a<b ? `${a}-${b}` : `${b}-${a}`;

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

module.exports.part_1 = ()=>{
    const lines = input.split('\n');
    /** @type {Map<string,number>} */
    const distances = new Map();
    const places = new Set();

    for (const line of lines) {
        const [lhs,dist] = line.split('=').map(v=>v.trim());
        const [a,b] = lhs.split('to').map(v=>v.trim());
        distances.set(map_entry(a,b),parseInt(dist));
        places.add(a);
        places.add(b);
    }

    
    
    const permutations = permutator([...places]);

    let min = Infinity;

    for (const permutation of permutations) {
        let total = 0;
        for (let i=0;i<permutation.length-1;i++) {
            total += distances.get(map_entry(permutation[i],permutation[i+1]));
        }
        if (total < min) {
            min = total;
        }
    }

    console.log(`Minimum distance: ${min}`);
    
}

module.exports.part_2 = ()=>{
    const lines = input.split('\n');
    /** @type {Map<string,number>} */
    const distances = new Map();
    const places = new Set();

    for (const line of lines) {
        const [lhs,dist] = line.split('=').map(v=>v.trim());
        const [a,b] = lhs.split('to').map(v=>v.trim());
        distances.set(map_entry(a,b),parseInt(dist));
        places.add(a);
        places.add(b);
    }

    
    
    const permutations = permutator([...places]);

    let max = 0;

    for (const permutation of permutations) {
        let total = 0;
        for (let i=0;i<permutation.length-1;i++) {
            total += distances.get(map_entry(permutation[i],permutation[i+1]));
        }
        if (total > max) {
            max = total;
        }
    }

    console.log(`Maximum distance: ${max}`);
}