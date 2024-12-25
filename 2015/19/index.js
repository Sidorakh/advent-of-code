const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function parse_input(input) {
    const lines = input.split('\n').filter(v=>v.length>0);
    /** @type {string} */
    let molecule = '';
    /** @type {{from: string, to: string} []}} */
    let replacements = [];
    for (const line of lines) {
        if (line.includes('=>')) {
            const [lhs,rhs] = line.split('=>').map(v=>v.trim());
            replacements.push({from: lhs, to: rhs});
        } else {
            molecule = line;
        }
    }

    return {molecule,replacements};
}
module.exports.part_1 = ()=>{
    const {molecule,replacements} = parse_input(input);
    const molecules = new Set();

    for (const replacement of replacements) {
        for (let i=0;i<molecule.length;i++) {
            if (molecule.slice(i,i+replacement.from.length) == replacement.from) {
                let new_molecule = molecule.slice(0,i) + replacement.to + molecule.slice(i+replacement.from.length);
                molecules.add(new_molecule);
            }
        }
    }

    console.log(`New molecules: ${molecules.size}`)
    
}



module.exports.part_2 = ()=>{
    const {molecule,replacements} = parse_input(input);

    replacements.sort((a,b)=>b.to.length-a.to.length);

    let steps = 0;
    
    const target = 'e';
    const visited = [molecule];
    const queue = [{molecule, steps: 0}];

    const solution = [];
    const stack = [];
    
    /** @type {{molecule: string, steps: number}} */
    let node;
    while (node = queue.shift()) {
        
    }

    console.log(`Solution foudn in ${steps}`);
}
// yeah no idwa how to do part 2, even looking up solutions didn't help