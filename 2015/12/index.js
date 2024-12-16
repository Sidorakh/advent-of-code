const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function get_nodes(/** @type {any[] | {[string: key]: any}}*/ json) {
    const nodes = [];
    if (Array.isArray(json)) {
        nodes.push(...json);
    } else if (typeof(json) == 'object') {
        nodes.push(...Object.values(json));
    }
    return nodes;
}

module.exports.part_1 = ()=>{
    const json = JSON.parse(input);
    // and now to walk the tree
    // fuck it, iteratively, why not
    let total = 0;

    const nodes = get_nodes(json);

    while (nodes.length > 0) {
        const node = nodes.shift();
        const new_nodes = get_nodes(node);
        if (new_nodes.length > 0) {
            nodes.push(...new_nodes);
            continue;
        };
        if (typeof(node) == 'number') {
            total += node;
        }
    }

    console.log(`Total: ${total}`);
}

module.exports.part_2 = ()=>{
    const json = JSON.parse(input);
    // and now to walk the tree
    // fuck it, iteratively, why not
    let total = 0;

    const nodes = get_nodes(json);

    while (nodes.length > 0) {
        const node = nodes.shift();
        const new_nodes = get_nodes(node);
        if (new_nodes.length > 0) {
            if (new_nodes.includes('red') && !Array.isArray(node)) { 
                continue;
            }
            nodes.push(...new_nodes);
            continue;
        };
        if (typeof(node) == 'number') {
            total += node;
        }
    }

    console.log(`Total: ${total}`);
}