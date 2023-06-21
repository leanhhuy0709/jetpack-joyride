import { DEPTH } from "../const/depth"

export default class Explosion extends Phaser.GameObjects.Sprite {
    private countDown: number
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setSize(100, 100)
        this.setDisplaySize(100, 100)
        
        this.countDown = 100

        this.scene.add.existing(this)


        this.setDepth(DEPTH.OBJECT_MEDIUM)
    }

    public update(delta: number): void {
        this.countDown -= delta

        if (this.countDown <= 0) this.setVisible(false)
    }
}