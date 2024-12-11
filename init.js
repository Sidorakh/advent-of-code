const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const year = readline.questionInt(`What year? `);

const template = fs.readFileSync('./template/index.js','utf8');

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


