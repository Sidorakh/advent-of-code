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

function count_substring(/** @type {string} */ string,/** @type {string} */ substr) {
    let num = 0;
    for (let i=string.indexOf(substr);i>=0;i=string.indexOf(substr,i+1), num += 1) {
        // hah, empty loop
        // #GOTTEM
    }
    return num;
}

module.exports.part_2 = ()=>{
    const {molecule,replacements} = parse_input(input);
    // turns out, there's a shortcut for this!

    const num = [...molecule].filter(v=>v.toLocaleUpperCase() == v).length - count_substring(molecule,'Rn')-count_substring(molecule,'Ar')-2*count_substring(molecule,'Y')-1;
    console.log(`Steps: ${num}`)
}