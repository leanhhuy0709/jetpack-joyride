import { DEPTH } from '../const/depth'

export default class Explosion extends Phaser.GameObjects.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setDepth(DEPTH.OBJECT_MEDIUM)
        this.setDisplaySize(100, 100)
        scene.add.existing(this)

        this.setAll(scene, x, y, key)
    }

    public setAll(scene: Phaser.Scene, x: number, y: number, key: string)
    {
        this.setPosition(x, y)
        this.setTexture(key)
        this.setAlpha(1)
        scene.add.existing(this)

        scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 1000,
        })
    }
}
