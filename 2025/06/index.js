const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');
const Grid = require('../../utils/grid');

module.exports.part_1 = ()=>{
    const data = input.split('\n').map(v=>v.trim().split(/\s+/g));
    const grid = new Grid(data);
    let sum = 0;
    for (let col=0;col<grid.width();col++) {
        const op = grid.get(col,grid.height()-1);
        let total = 0;
        for (let row=0;row<grid.height()-1;row++) {
            const num = parseInt(grid.get(col,row));
            //console.log(num);
            //console.log(op);
            if (op == '*') {
                if (total == 0) {
                    total = 1;
                }
                total *= num;
            }
            if (op == '+') {
                total += num;
            }
        }
        sum += total;
    }

    console.log(`Part 1: ${sum}`);
}

module.exports.part_2 = ()=>{
    const data = input.split('\n');
    const sheet = new Grid(data);
    
    const width = sheet.width();
    let symbols = 0;
    const offsets = [];
    for (let i=0;i<width;i++) {
        const symbol = sheet.get(i,sheet.height()-1);
        if (symbol == '+' || symbol == '*') {
            symbols += 1;
            offsets.push({index: i, operator: symbol});
        }
    }

    const grid = Grid.create(symbols,(sheet.height()-1));

    let sum = 0;
    for (let i=0;i<offsets.length;i++) {
        let x1 = offsets[i].index;
        let x2 = (offsets[i+1]?.index || sheet.width())-1;
        
        //console.log(sheet.height());
        const section = sheet.region(x1,0,x2,sheet.height()-2);
        console.log(section.map(v=>v.join('')).join('\n') + '\n--')
        let total = 0;
        for (let x=(x2-x1);x>=0;x--) {
            
            let num = '';
            for (let y=section.length-1;y>=0;y--) {
                const c = section[y][x];
                if (c.trim()) {
                    num = c + num;
                }
            }
            console.log(num);
            if (num.length > 0) {
                num = parseInt(num);
                if (offsets[i].operator == '*') {
                    if (total == 0) {
                        total = 1;
                    }
                    total *= num;
                } else if (offsets[i].operator == '+') {
                    total += num;
                }
            }
        }
        sum += total;
        console.log('--');
    }

    console.log(`Part 2: ${sum}`);

}