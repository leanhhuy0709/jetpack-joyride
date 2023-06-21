import Obstacle from './Obstacle'

export default class Zap extends Obstacle {
    private sprite1: Phaser.GameObjects.Sprite
    private sprite2: Phaser.GameObjects.Sprite
    public constructor(scene: Phaser.Scene, x1: number, y1: number, x2: number, y2: number) {
        super(scene)
        this.sprite1 = scene.add.sprite(x1, y1, 'zap').setDisplaySize(75 * 2, 58 * 2)
        this.sprite2 = scene.add.sprite(x2, y2, 'zap').setDisplaySize(75 * 2, 58 * 2)

        if (x2 == x1) {
            console.log('x1 = x2 => Error, Fix by x1 += 1')
            x1 += 1
        }

        this.sprite1.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
        this.sprite2.setRotation(-Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))

        this.sprite1.anims.create({
            key: 'turn1',
            frames: this.sprite1.anims.generateFrameNumbers('zap', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        })

        this.sprite2.anims.create({
            key: 'turn2',
            frames: this.sprite2.anims.generateFrameNumbers('zap', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        })

        this.sprite1.anims.play('turn1')
        this.sprite2.anims.play('turn2')

        const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

        this.rect = this.scene.add.rectangle((x1 + x2) / 2, (y1 + y2) / 2, 75, d, 0xFFF8E7, 0.5)
        this.rect.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))

        this.scene.add.existing(this.rect)
        this.scene.physics.add.existing(this.rect, true)
    }
}
