import { DEPTH } from "../const/depth"

export default class Explosion extends Phaser.GameObjects.Sprite {
    private countDown: number
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setDisplaySize(100, 100)
        this.setSize(100, 100)
        this.setDepth(DEPTH.OBJECT_MEDIUM)
        
        this.countDown = 100
        scene.add.existing(this)
    }

    public update(delta: number): void {
        this.countDown -= delta

        if (this.countDown <= 0) this.setVisible(false)
    }
}