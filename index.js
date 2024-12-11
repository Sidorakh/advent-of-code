const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const year = readline.questionInt(`What year? `);

if (!fs.existsSync(`./${year}`)) {
    console.log(`${year} does not exist`);
}

const day = readline.questionInt(`What day? `)


const day_dir = path.join(`./`,year.toString(),`${day}`.padStart(2,'0'));

if (!fs.existsSync(day_dir)) {
    console.log(`${day_dir} does not exist`);
}

console.log(day_dir);

const code = require(`./` + day_dir);



const part = readline.questionInt(`Which part? (1 or 2, 0 for both) `);

(async()=>{
    if (part == 0) {
        await code.part_1();
        await code.part_2();
    }
    if (part == 1) {
        await code.part_1();
    }
    if (part == 2) {
        await code.part_2();
    }
})();


