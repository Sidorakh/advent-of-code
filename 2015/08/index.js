const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

module.exports.part_1 = ()=>{
    const lines = input.split('\n');
    let code_total = 0;
    let memory_total = 0;

    for (const line of lines) {
        let processed_line = '';
        for (let i=1;i<line.length-1;i++) {
            // -1 to skip last character
            if (line[i] == '\\') {
                const next = line[i+1];
                if (next == '"') {
                    processed_line += '"';
                    i += 1;
                    continue;
                } else if (next == '\\') {
                    processed_line += '\\';
                    i += 1;
                    continue;
                }
                if (next == 'x') {
                    i += 3;
                    const chr = String.fromCharCode(parseInt(line.slice(i+2,i+4),16));
                    processed_line += chr;
                }
            } else {
                processed_line += line[i];
            }
        }
        memory_total += processed_line.length;
        code_total += line.length;
    }

    console.log(`Difference: ${code_total - memory_total}`);
    
}

module.exports.part_2 = ()=>{
    const lines = input.split('\n');
    let code_total = 0;
    let processed_total = 0;
    for (const line of lines) {
        let processed_line = '"';
        for (let i=0;i<line.length;i++) {
            if (line[i] == '"') {
                processed_line += '\\';
            }
            if (line[i] == '\\') {
                processed_line += '\\';
            }
            processed_line += line[i];
        }
        processed_line += '"';
        processed_total += processed_line.length;
        code_total += line.length;
    }
    console.log(`Difference: ${processed_total - code_total}`);

}