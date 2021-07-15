export class DisjointUnionSets {
    constructor(n) {
        this.rank = [];
        this.parent = [];
        this.n = n;
        this.makeSet();
    }

    makeSet() {
        for (let i = 0; i < this.n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }

        return this.parent[x];
    }

    union(x, y) {
        let xRoot = this.find(x), yRoot = this.find(y);

        if (xRoot === yRoot) {
            return;
        }
        if (this.rank[xRoot] < this.rank[yRoot]) {
            this.parent[xRoot] = yRoot;
        }
        else if (this.rank[yRoot] < this.rank[xRoot]) {
            this.parent[yRoot] = xRoot;
        }
        else {
            this.parent[yRoot] = xRoot;
            this.rank[xRoot] = this.rank[xRoot] + 1;
        }
    }

    export() {
        for (let i = 0; i < this.n; i++) {

        }
    }
}