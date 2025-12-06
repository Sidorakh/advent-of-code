const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const list = input.split(',');
    let total = 0;
    for (const range of list) {
        const [min,max] = range.split('-').map(v=>parseInt(v));
        for (let num=min;num<=max;num++) {
            var str = `${num}`;
            
            if (str.length % 2 == 0) {
                if (str.slice(0,str.length / 2) == str.slice(str.length/2)) {
                    //console.log(str);
                    total += num;
                }
            }
        }
    }
    console.log(`Total: ${total}`);
}

module.exports.part_2 = ()=>{
    const list = input.split(',');
    let total = 0;
    for (const range of list) {
        const [min,max] = range.split('-').map(v=>parseInt(v));
        for (let num=min;num<=max;num++) {
            var str = `${num}`;
            
            for (let i=1;i<=str.length/2;i++) {
                if (str.length % i == 0) {
                    const segment = str.slice(0,i);
                    let is_repeat = true;

                    for (let k=segment.length;k<str.length;k+=segment.length) {
                        if (segment != str.slice(k,k+segment.length)) {
                            is_repeat = false;
                        }
                    }
                    
                    if (is_repeat) {
                        total += num;
                        break;
                    }
                }
            }
        }
    }
    console.log(`Total: ${total}`);
}