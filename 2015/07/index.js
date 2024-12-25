const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function uint16 (n) {
    return n & 0xFFFF;
}

function not_16(n) {
    if (~n < 0) {
        return uint16(65535 - n);
    } else if (~n > 0) {
        return (n*-1) - 1
    } else {
        return -1;
    }
}

const reg_is_digit = /^\d+$/;
function parse_input(/** @type {string} */ input) {
    /** @type {Map<string,{type: 'ASSIGN'|'AND'|'OR'|'LSHIFT'|'RSHIFT'|'NOT', left: string | number, right: string | number, target: string;}} */
    const wires = new Map();
    for (const wire of input.split('\n')) {
        const [lhs,rhs] = wire.split('->').map(v=>v.trim());
        const op = {
            type: '',
            left: '',
            right: '',
            target: rhs,
        };

        if (lhs.startsWith('NOT')) {
            op.type = 'NOT';
            op.left = lhs.replace('NOT','').trim();
        } else {
            const result = wire.match(/(?<left>[a-z0-9]+) (?<op>[A-Z]+) (?<right>[a-z0-9]+)/);
            if (result && result.groups) {
                op.left = result.groups.left;
                op.right = result.groups.right;

                if (reg_is_digit.test(op.left)) {
                    op.left = parseInt(op.left);
                }
                if (reg_is_digit.test(op.right)) {
                    op.right = parseInt(op.right);
                }
                
                op.type = result.groups.op;
            } else {    
                op.type = 'ASSIGN';
                op.left = lhs;
                if (reg_is_digit.test(op.left)) {
                    op.left = parseInt(op.left);
                }
            }
        }
        wires.set(rhs,op);
    }
    return wires;
}

module.exports.part_1 = (log=true)=>{
    const wires = parse_input(input);
    const solved = new Map();

    const stack = [...wires.values()];

    while (stack.length > 0) {
        const wire = stack.shift();
        //console.log(stack)
        //console.log([...solved.entries()].map(v=>`${v[0]}: ${v[1]}`))
        if (solved.has(wire.target)) continue;
        if (wire.type == 'ASSIGN') {
            if (reg_is_digit.test(wire.left)) {
                solved.set(wire.target,parseInt(wire.left));
            } else if (solved.has(wire.left)) {
                solved.set(wire.target,solved.get(wire.left));
            } else {
                stack.push(wire);
            }
            continue;
        }
        const left_solved = reg_is_digit.test(wire.left) || solved.has(wire.left);
        const left_is_register = !reg_is_digit.test(wire.left);
        if (wire.type == 'NOT') {
            if (!left_solved) {
                stack.push(wire);
                continue;
            }
            const left = left_is_register ? solved.get(wire.left) : parseInt(wire.left);
            solved.set(wire.target,not_16(left))
            continue;
        }
        const right_solved = reg_is_digit.test(wire.right) || solved.has(wire.right);
        const right_is_register = !reg_is_digit.test(wire.right);
        if (!(left_solved && right_solved)) {
            stack.push(wire);
            continue;
        }
        const left = left_is_register ? solved.get(wire.left) : parseInt(wire.left);
        const right = right_is_register ? solved.get(wire.right) : parseInt(wire.right);
        if (wire.type == 'AND') {
            solved.set(wire.target, uint16(left & right));
        } else if (wire.type == 'OR') {
            solved.set(wire.target, uint16(left | right));
        } else if (wire.type == 'LSHIFT') {
            solved.set(wire.target, uint16(left << right));
        } else if (wire.type == 'RSHIFT') {
            solved.set(wire.target, uint16(left >> right));
        }
        
    }
    if (log) {
        console.log(`Value of a: ${solved.get('a')}`);
    }
    return solved.get('a');
    
}

module.exports.part_2 = ()=>{

    const wires = parse_input(input);
    const solved = new Map();

    const new_a_signal = this.part_1(false);
    solved.set('b',new_a_signal);

    const stack = [...wires.values()];

    while (stack.length > 0) {
        const wire = stack.shift();
        //console.log(stack)
        //console.log([...solved.entries()].map(v=>`${v[0]}: ${v[1]}`))
        if (solved.has(wire.target)) continue;
        if (wire.type == 'ASSIGN') {
            if (reg_is_digit.test(wire.left)) {
                solved.set(wire.target,parseInt(wire.left));
            } else if (solved.has(wire.left)) {
                solved.set(wire.target,solved.get(wire.left));
            } else {
                stack.push(wire);
            }
            continue;
        }
        const left_solved = reg_is_digit.test(wire.left) || solved.has(wire.left);
        const left_is_register = !reg_is_digit.test(wire.left);
        if (wire.type == 'NOT') {
            if (!left_solved) {
                stack.push(wire);
                continue;
            }
            const left = left_is_register ? solved.get(wire.left) : parseInt(wire.left);
            solved.set(wire.target,not_16(left))
            continue;
        }
        const right_solved = reg_is_digit.test(wire.right) || solved.has(wire.right);
        const right_is_register = !reg_is_digit.test(wire.right);
        if (!(left_solved && right_solved)) {
            stack.push(wire);
            continue;
        }
        const left = left_is_register ? solved.get(wire.left) : parseInt(wire.left);
        const right = right_is_register ? solved.get(wire.right) : parseInt(wire.right);
        if (wire.type == 'AND') {
            solved.set(wire.target, uint16(left & right));
        } else if (wire.type == 'OR') {
            solved.set(wire.target, uint16(left | right));
        } else if (wire.type == 'LSHIFT') {
            solved.set(wire.target, uint16(left << right));
        } else if (wire.type == 'RSHIFT') {
            solved.set(wire.target, uint16(left >> right));
        }
        
    }

    console.log(`Value of a: ${solved.get('a')}`)
    return solved.get('a');
}