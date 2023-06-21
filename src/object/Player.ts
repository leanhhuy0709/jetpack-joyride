import * as Phaser from 'phaser'
export default class Player extends Phaser.GameObjects.Sprite {
    private isFlying: boolean
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setSize(200, 200)
        this.setDisplaySize(200, 200)
        this.isFlying = false

        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers(key, { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers(key, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1,
        })

        this.scene.physics.world.enable(this)

        this.anims.play('fall')
        if (this.body) {
            this.body.velocity.y = 1 //defaul fall
        }
        this.scene.add.existing(this)
    }

    public update(_delta: number): void {
        super.update()

        if (this.body) {
            if (this.body.velocity.y == 0 && this.anims.currentAnim?.key != 'move') this.moving()
            else if (this.isFlying) this.flying()
            else this.falling()
        }
    }

    public flying(): void {
        if (this.body) {
            if (this.body.position.y <= 0) {
                this.body.position.y = 0
            } else {
                this.body.velocity.y = -1200
                this.isFlying = true
                this.anims.play('fly')
            }
        }
    }

    public falling(): void {
        if (this.body && this.isFlying) {
            this.body.velocity.y = 1
            this.isFlying = false
            this.anims.play('fall')
        }
    }

    public moving(): void {
        this.anims.play('move')
    }
}
