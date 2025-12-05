const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const [range_input, ingredient_input] = input.split('\n\n').map(v=>v.split('\n'));
    //console.log(range_input);
    //console.log(ingredient_input);
    const ranges = range_input.map(v=>{
        const [min,max] = v.split('-').map(n=>parseInt(n));
        return {min,max};
    });
    const ingredients = ingredient_input.map(v=>{
        return parseInt(v);
    })
    //console.log(ranges);
    //console.log(ingredients);
    let fresh = 0;
    for (const ingredient of ingredients) {
        for (const range of ranges) {
            if (ingredient >= range.min && ingredient <= range.max) {
                fresh += 1;
                break
            }
        }
    }

    console.log(`Part 1: ${fresh}`)
}


module.exports.part_2 = ()=>{
    
    const [range_input, ingredient_input] = input.split('\n\n').map(v=>v.split('\n'));
    const ranges = range_input.map((v) => {
        const [min,max] = v.split('-').map(n=>parseInt(n));
        return {min,max}
    });

    let sum = 0;
    const filtered_ranges = [];

    for (const range of ranges) {
        let size = range.max - range.min + 1;
        const overlaps = filtered_ranges.filter((v) => range.min <= v.max && v.min <= range.max);

        for (const overlap of overlaps) {
            const overlap_size = Math.min(range.max, overlap.max) - Math.max(range.min, overlap.min) + 1;
            
            size -= overlap_size;

            if (range.min <= overlap.min) {
                if (overlap.max <= range.max) {
                    filtered_ranges.splice(filtered_ranges.indexOf(overlap), 1);
                } else {
                    overlap.min = range.max + 1;
                }
            } else {
                overlap.max = range.min - 1;
            }
        }
        sum += size;
        filtered_ranges.push(range);
    }
    

    console.log(`Part 2: ${sum}`);
}