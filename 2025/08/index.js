const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

/** 
 * @typedef {Object} JunctionBox
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {Set<JunctionBox> | null} circuit
 */

module.exports.part_1 = ()=>{
    const boxes = input.split('\n').map(v => v.split(',').map(n => parseInt(n))).map(v => ({x: v[0],y: v[1], z: v[2], circuit: null}));
    
    /** @type {Set<JunctioBox>} */
    const circuits = new Set();
    /** @type {Map<number,[JunctionBox,JunctionBox]>} */
    const distances = new Map();
    for (let i=0;i<boxes.length;i++) {
        const box_a = boxes[i];
        for (let j=i+1;j<boxes.length;j++) {
            const box_b = boxes[j];
            const distance = point_distance_3d(box_a.x,box_a.y,box_a.z,box_b.x,box_b.y,box_b.z);
            distances.set(distance, [box_a,box_b]);
        }
    }
    const distance_keys = [...distances.keys()].sort((a,b)=>a-b);
    const num = boxes.length > 50 ? 1000 : 10;

    
    for (let i=0;i<num;i++) {
        if (i >= distance_keys.length) {
            break;
        }
        /** @type {[JunctionBox,JunctionBox]} */
        const [box_a,box_b] = distances.get(distance_keys[i]);

        box_a.circuit = box_a.circuit == null ? new Set() : box_a.circuit;
        box_b.circuit = box_b.circuit == null ? new Set() : box_b.circuit;

        if (!box_a.circuit.has(box_b) || box_b.circuit.has(box_a)) {
            const circuit = new Set([...box_a.circuit,...box_b.circuit]);
            circuits.delete(box_a.circuit);
            circuits.delete(box_b.circuit);
            circuits.add(circuit);
            circuit.add(box_a);
            circuit.add(box_b);

            for (const box of [...circuit]) {
                box.circuit = circuit;
            }
        }
    }

    /** @type {Set<JunctionBox>[]} */
    const sorted_circuits = [...circuits].sort((a,b)=>a.size-b.size).reverse();

    let result = 1;
    for (let i=0;i<3;i++) {
        result *= sorted_circuits[i].size;
    }



    console.log(`Part 1: ${result}`);

}

module.exports.part_2 = ()=>{
    const boxes = input.split('\n').map(v => v.split(',').map(n => parseInt(n))).map(v => ({x: v[0],y: v[1], z: v[2], circuit: null}));
    let result = 0;
    /** @type {Map<number,[JunctionBox,JunctionBox]>} */
    const distances = new Map();

    
    // get the distances between each junction box
    for (let i=0; i < boxes.length-1; i++) {
      const j0 = boxes[i];

      for (let n=i+1; n < boxes.length; n++) {
        const j1 = boxes[n];

        const dist = Math.sqrt(Math.pow(j0.x - j1.x, 2) + Math.pow(j0.y - j1.y, 2) + Math.pow(j0.z - j1.z, 2));

        distances.set(dist, [j0, j1]);
      }
    }

    const distance_keys = [...distances.keys()].sort((a, b) => a - b);


    // create the appropriate number of connections
    let i = 0;
    while (true) {
      if (i >= distance_keys.length) {
        break;
      }

      /** @type {[JunctionBox,JunctionBox]} */
      const [box_a, box_b] =[...distances.get(distance_keys[i])];

      const circuit_a = box_a.circuit ?? new Set();
      const circuit_b = box_b.circuit ?? new Set();
      
      // if neither circuit contains the other's junction
      if (!circuit_a.has(box_b) || !circuit_b.has(box_a)) {

        // create a new combined circuit
        const circuit = new Set([...circuit_a, ...circuit_b]);
        circuit.add(box_a);
        circuit.add(box_b);
        for (const box of [...circuit.values()]) {
            box.circuit = circuit;
        }

        if (circuit.size === boxes.length) {
          result = box_a.x * box_b.x;
          break;
        }
      }

      i++;
    }

    console.log(`Part 2: ${result}`)
}

function point_distance_3d(x1,y1,z1,x2,y2,z2) {
    return Math.sqrt(((x2-x1)**2)+((y2-y1)**2)+((z2-z1)**2));
}