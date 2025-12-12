class Grid {
    data = [];
    #width = 0;
    #height = 0;
    constructor(grid) {
        this.data = [];
        for (const row of grid) {
            const new_row = [...row]
            this.data.push(new_row);
            this.#width = Math.max(this.#width,new_row.length);
        }
        this.#height = this.data.length;
    }
    get(x,y) {
        if (x < 0 || x >= this.width() || y < 0 || y >= this.height()) return undefined;
        return this.data[y][x];
    }
    region(x1,y1,x2,y2) {
        if (x1 < 0 || x1 >= this.width() || y1 < 0 || y1 >= this.height()) return undefined;
        if (x2 < 0 || x2 >= this.width() || y2 < 0 || y2 >= this.height()) return undefined;
        const out = [];
        for (let y=y1;y<=y2;y++) {
            if (out[y-y1] == undefined) {
                out[y-y1] = [];
            }
            for (let x=x1;x<=x2;x++) {
                out[y-y1][x-x1] = this.get(x,y);
            }
        }
        
        return out;
    }
    set(x,y,v) {
        if (x < 0 || y < 0) {
            return false;
        }
        if (y >= this.height()) {
            this.data[y] = [];
        }
        //if (x >= this.width()) {
        this.data[y][x] = v;
        //}
        return true;
    }
    width() {
        return this.#width;
    }
    height() {
        return this.#height;
    }
    log() {
        console.log(this.data.map(v=>v.join('')).join('\n'));
    }
    stringify() {
        return this.data.map(v=>v.join('')).join('\n')
    }
    static create(w,h,value=null) {
        const d = new Array(h);
        for (let y=0;y<h;y++) {
            d[y] = new Array(w).fill(value);
        }
        return new Grid(d);
        
    }
}


module.exports = Grid;