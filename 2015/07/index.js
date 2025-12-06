const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8').split('\n').map(v=>v.trim()).filter(v=>v.length > 0);

function uint16 (n) {
    return n & 0xFFFF;
}

function not_16(n) {
    /*
    const arr = new Uint16Array(1)
    arr[0] = uint16(n);
    arr[0] = ~arr[0];
    console.log(~n);
    console.log(arr[0]);
    return arr[0];
    */
    if (~n < 0) {
        return uint16(65535 - n);
    } else if (~n > 0) {
        return (n*-1) - 1
    } else {
        return -1;
    }
}

// function recursive_simulator(/** @type {Map<string,{type: string, left: string | number, right: string | number, target: string;}} */ wires,/** @type {string} */ target, /** @type {Map<string,number>} */ solved, /** @type {Map<string,Boolean> */ visited) {
//
//     visited.set(target,true);
//     const wire = wires.get(target);
//     console.log(target);
//     let left = wire.left;
//     let right = wire.right;
//
//     if (typeof(left) == 'string' && left != '') {
//         if (!solved.has(left)) {
//             left = recursive_simulator(wires,left,solved,visited);
//         } else {
//             left = solved.get(left);
//         }
//     }
//     if (typeof(right) == 'string' && right != '') {
//         if (!solved.has(right)) {
//             right = recursive_simulator(wires,right,solved,visited);
//         } else {
//             right = solved.get(right);
//         }
//     }
//     if (wire.type == 'ASSIGN') {
//         solved.set(wire.target,wire.left);
//     }
//     if (wire.type == 'NOT') {
//         solved.set(wire.target,not_16(wire.left));
//     }
//     if (wire.type == 'AND') {
//         solved.set(uint16(wire.target,wire.left & wire.right));
//     }
//     if (wire.type == 'OR') {
//         solved.set(uint16(wire.target,wire.left | wire.right));
//     }
//     if (wire.type == 'LSHIFT') {
//         solved.set(uint16(wire.target,wire.left << wire.right));
//     }
//     if (wire.type == 'RSHIFT') {
//         solved.set(uint16(wire.target,wire.left >> wire.right));
//     }
//
//
//     return solved.get(wire.target);
// }

function unique_push(array,item) {
    if (array.includes(item)) return;
    array.push(item);
}
function calculate_circuit(/** @type {Map<string,{type: string, left: string | number, right: string | number, target: string;}} */ wires,/** @type {string} */ target, /** @type {Map<string,number>} */ solved) {
    /** @type {{type: string, left: string | number, right: string | number, target: string;}[]} */
    const stack = [];
    stack.push(wires.get(target));
    while (stack.length > 0) {
        const node = stack.shift();
        if (node == undefined) continue;
        console.log(`${(node.target)} | ${stack.length} | ${solved.size}`);
        if (node.type == 'ASSIGN' || node.type == 'NOT') {
            // only one element on the LHS
            if (typeof(node.left) == 'string') {
                if (solved.get(node.left)) {
                    node.left = solved.get(node.left);
                } else {
                    unique_push(stack,wires.get(node.left));
                    unique_push(stack,node);
                }
            } else {
                if (node.type == 'ASSIGN') {
                    solved.set(node.target, node.left);
                } else if (node.type == 'NOT') {
                    solved.set(node.target,not_16(node.left));
                }
            }
        } else {
            // two elements on the LHS
            if (node.target == 'b' && node.type == 'RSHIFT') {
                console.log('hello b node?')
            }
            if (typeof(node.left) == 'string' || typeof(node.right) == 'string') {
                
                if (typeof(node.left) == 'string') {
                    if (solved.get(node.left)) {
                        node.left = solved.get(node.left);
                    } else {
                        unique_push(stack,wires.get(node.left));
                    }
                }
                unique_push(stack,node);
                if (typeof(node.right) == 'string') {
                    if (solved.get(node.right)) {
                        node.left = solved.get(node.right);
                    } else {
                        unique_push(stack,wires.get(node.right));
                    }
                }
            } else {
                // both numbers -> solvable
                if (node.type == 'AND') {
                    solved.set(node.target,uint16(node.left & node.right));
                }
                if (node.type == 'OR') {
                    solved.set(node.target,uint16(node.left | node.right));
                }
                if (node.type == 'LSHIFT') {
                    solved.set(node.target,uint16(node.left << node.right));
                }
                if (node.type == 'RSHIFT') {
                    
                    solved.set(node.target,uint16(node.left >> node.right));
                }
            }

        }
        if (solved.size == 6) {
            console.log([...solved.entries()]);
            process.exit();
        }
    }
    return solved.get(target);
}

module.exports.part_1 = ()=>{
    /** @type {Map<string,{type: string, left: string | number, right: string | number, target: string;}} */
    const wires = new Map();
    
    const reg_is_digit = /^\d+$/;

    for (const wire of input) {
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

    // and now, solve
    const target = 'a';

    const solved = new Map();
    const visited = new Map();
    
    const wire_a = calculate_circuit(wires,'a',solved);

    console.log(`Wire A signal: ${wire_a}`)
    
}

module.exports.part_2 = ()=>{

}