require('dotenv').config();
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync('./template/index.js','utf8');

if (!process.env.TOKEN) {
    if (!fs.existsSync('./.env')) {
        fs.writeFileSync('./.env','');
    }
    console.log(`Fetch your token from adventofcode.org and place it in the .env file`)
    process.exit();
}

const [year,day] = (process.argv.splice(2)[0]).split('/');

//console.log(`Year: ${year}\nDay: ${day}`)

(async()=>{
    
    if (!fs.existsSync(`./${year}`)) {
        fs.mkdirSync(`./${year}`);
    }
    const day_dir = `./${year}/${parseInt(day).toString().padStart(2,'0')}`;
    if (!fs.existsSync(day_dir)) {
        fs.mkdirSync(day_dir);
    }


    const result = await fetch(`https://adventofcode.com/${year}/day/${parseInt(day)}/input`,{method: 'GET',headers: {cookie: `session=${process.env.TOKEN}`}});
    const data = await result.text();
    fs.writeFileSync(path.join(day_dir,'input.txt'),data);
    if (!fs.existsSync(path.join(day_dir,'.gitignore'))) {
        fs.writeFileSync(path.join(day_dir,'.gitignore'),'input.txt');
    }
    if (!fs.existsSync(path.join(day_dir,'index.js'))) {
        fs.writeFileSync(path.join(day_dir,'index.js'),template);
    }
})();




//const readline = require('readline-sync');


/*
const year = readline.questionInt(`What year? `);


const year_dir = path.join('./',year.toString());
if (!fs.existsSync(year_dir)) {
    fs.mkdirSync(year_dir);
}

const day = readline.questionInt(`What day? `);

if (day > 25) {
    console.log(`Invalid day`);
    return;
}

const dir = path.join(year_dir,`${day}`.padStart(2,'0'));
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir,'.gitignore'),'input.txt');
    fs.writeFileSync(path.join(dir,'input.txt'),'');
    fs.writeFileSync(path.join(dir,'index.js'),template);
}

console.log(`Created ${year} / ${day}`)


*/

