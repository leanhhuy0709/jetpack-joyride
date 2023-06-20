import * as Phaser from 'phaser'
export default class Player {
    private x: number
    private y: number
    private w: number
    private h: number
    private keySprite: string
    private spriteHref: string
    private obj: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    private scene: Phaser.Scene

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        w: number,
        h: number,
        keySprite: string,
        spriteHref: string
    ) {
        this.scene = scene
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.keySprite = keySprite
        this.spriteHref = spriteHref
    }

    public preload(): void {
        this.scene.load.spritesheet(this.keySprite, this.spriteHref, {
            frameWidth: this.w,
            frameHeight: this.h,
        })
    }

    public create(): void {
        this.obj = this.scene.physics.add.sprite(100, 300, 'dude')
        this.obj.setBounce(0.2)
        this.obj.setCollideWorldBounds(true)
    }

    public getObj(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    {
        return this.obj
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public setX(x: number): void {
        this.x = x
    }

    public setY(y: number): void {
        this.y = y
    }

    public getW(): number {
        return this.w
    }

    public getH(): number {
        return this.h
    }

    public setW(w: number): void {
        this.w = w
    }

    public setH(h: number): void {
        this.h = h
    }


}
