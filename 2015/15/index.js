const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function parse_input(/** @type {string} */ input) {
    const lines = input.split('\n');
    /** @type {{name: string, capacity: number, durability: number, flavour: number, texture: number, calories: number}[]} */
    const ingredients = [];
    const regex = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

    for (const line of lines) {
        const matches = line.match(regex);
        const ingredient = {
            name: matches[1],
            capacity: parseInt(matches[2]),
            durability: parseInt(matches[3]),
            flavour: parseInt(matches[4]),
            texture: parseInt(matches[5]),
            calories: parseInt(matches[6]),
        }    
        ingredients.push(ingredient);
    }
    return ingredients;
}

function * get_four_combiantions(max) {
    for (let a=1;a<=max-3;a++) {
        //yield [a,max-a];
        for (let b=1;b<=max-a;b++) {
            for (let c=1;c<=max-a-b-1;c++) {
                yield [a,b,c,max-a-b-c];
            }
        }
    }
}

module.exports.part_1 = ()=>{
    const ingredients = parse_input(input);
    console.log(ingredients);
    const combinations = [...get_four_combiantions(100)];
    let best = -1;
    for (const combo of combinations) {
        let capacity = 0;
        let durability = 0;
        let flavour = 0;
        let texture = 0;
        let calories = 0;

        for (let i=0;i<ingredients.length;i++) {
            capacity += ingredients[i].capacity * combo[i];
            //if (capacity < 0) capacity = 0;
            
            durability += ingredients[i].durability * combo[i];
            //if (durability < 0) durability = 0;
            
            flavour += ingredients[i].flavour * combo[i];
            //if (flavour < 0) flavour = 0;
            
            texture += ingredients[i].texture * combo[i];
            //if (texture < 0) texture = 0;

            
        //console.log(`${typeof(ingredients[i].capacity)}-${typeof(ingredients[i].durability)}-${typeof(ingredients[i].flavour)}-${typeof(ingredients[i].texture)}-`);
            
        }
        
        //console.log(`${capacity}-${durability}-${flavour}-${texture}-`);

        if (capacity < 0) capacity = 0;
        if (durability < 0) durability = 0;
        if (flavour < 0) flavour = 0;
        if (texture < 0) texture = 0;
        

        const cookie_total = capacity * durability * flavour * texture;
        //console.log(cookie_total);
        if (cookie_total > best) best = cookie_total;
        
    }

    console.log(`Best cookie: ${best}`)
    
}

module.exports.part_2 = ()=>{
    const ingredients = parse_input(input);
    console.log(ingredients);
    const combinations = [...get_four_combiantions(100)];
    let best = -1;
    for (const combo of combinations) {
        let capacity = 0;
        let durability = 0;
        let flavour = 0;
        let texture = 0;
        let calories = 0;

        for (let i=0;i<ingredients.length;i++) {
            capacity += ingredients[i].capacity * combo[i];
            //if (capacity < 0) capacity = 0;
            
            durability += ingredients[i].durability * combo[i];
            //if (durability < 0) durability = 0;
            
            flavour += ingredients[i].flavour * combo[i];
            //if (flavour < 0) flavour = 0;
            
            texture += ingredients[i].texture * combo[i];
            //if (texture < 0) texture = 0;

            calories += ingredients[i].calories * combo[i];

            
        //console.log(`${typeof(ingredients[i].capacity)}-${typeof(ingredients[i].durability)}-${typeof(ingredients[i].flavour)}-${typeof(ingredients[i].texture)}-`);
            
        }
        
        //console.log(`${capacity}-${durability}-${flavour}-${texture}-`);

        if (capacity < 0) capacity = 0;
        if (durability < 0) durability = 0;
        if (flavour < 0) flavour = 0;
        if (texture < 0) texture = 0;
        

        const cookie_total = capacity * durability * flavour * texture;
        //console.log(cookie_total);
        if (cookie_total > best && calories <= 500) best = cookie_total;
        
    }

    console.log(`Best cookie: ${best}`)
}