import { DEPTH } from '../const/depth'

export default class Coin extends Phaser.Physics.Matter.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(75, 75)
            .setStatic(true)
            .setDepth(DEPTH.OBJECT_HIGH)
            .setCollisionGroup(-2)
        scene.add.existing(this)
        if (!this.scene.anims.exists('turn'))
            this.scene.anims.create({
                key: 'turn',
                frames: this.anims.generateFrameNumbers(key, { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1,
            })

        this.play('turn')
    }
}
