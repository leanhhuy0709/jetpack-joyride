export class Object {
    private x: number
    private y: number
    private radius: number

    constructor(x: number, y: number, radius: number) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public getRadius(): number {
        return this.radius
    }

    public setX(x: number): void {
        this.x = x
    }

    public setY(y: number): void {
        this.y = y
    }

    public setRadius(radius: number): void {
        this.radius = radius
    }

    public getDistance(object: Object): number {
        return Math.sqrt(Math.pow(this.x - object.getX(), 2) + Math.pow(this.y - object.getY(), 2))
    }

    public isCollid(object: Object): boolean {
        return this.getDistance(object) < this.radius + object.getRadius()
    }
}
const objs: Object[] = []

for (let i = 0; i < 10000; i++) {
    const x = Math.floor(Math.random() * 1000),
        y = Math.floor(Math.random() * 1000),
        r = Math.floor(Math.random() * 1000)
    objs.push(new Object(x, y, r))
}

const st = Date.now()
let numCollid = 0
for (let i = 0; i + 1 < objs.length; i++) {
    for (let j = i + 1; j < objs.length; j++) {
        if (objs[i].isCollid(objs[j])) numCollid++
    }
}
console.log(numCollid)
const ed = Date.now()
console.log(ed - st)

const st2 = Date.now()

const m = Math.floor(Math.sqrt(objs.length)),
    n = Math.floor(objs.length / m)

const grid: Object[][][] = []
for (let i = 0; i < m; i++) {
    grid.push([])
    for (let j = 0; j < n; j++) {
        grid[i].push([])
    }
}

for (let i = 0; i < objs.length; i++) {
    // Check object in grid
    
}

const ed2 = Date.now()
console.log(ed - st)
