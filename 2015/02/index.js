const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const gifts = input.split('\n');
    let total = 0;
    for (const gift of gifts) {
        const [l,w,h] = gift.split('x').map(v=>parseInt(v));
        const f1 = l*w;
        const f2 = w*h;
        const f3 = h*l;

        total += (f1+f2+f3)*2 + Math.min(f1,f2,f3);
    }

    console.log(`Total: ${total}`);
}

module.exports.part_2 = ()=>{
    const gifts = input.split('\n');
    let total = 0;
    for (const gift of gifts) {
        const [l,w,h] = gift.split('x').map(v=>parseInt(v));
        const f1 = l+l+w+w;
        const f2 = w+w+h+h;
        const f3 = h+h+l+l;

        const bow = l*w*h;

        total += Math.min(f1,f2,f3) + bow;
    }

    console.log(`Total: ${total}`);
}