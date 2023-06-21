import * as Phaser from 'phaser'
import Bullet from './Bullet'
import Explosion from './Explosion'

const DELAY_FIRE_BULLET = 5
export default class Player extends Phaser.GameObjects.Sprite {
    private isFlying: boolean
    private bullets: Bullet[]
    private delayFire: number
    private platforms: Phaser.Physics.Arcade.StaticGroup

    public constructor(scene: Phaser.Scene, x: number, y: number, key: string, platforms: Phaser.Physics.Arcade.StaticGroup) {
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

        this.bullets = []
        this.delayFire = DELAY_FIRE_BULLET
        this.setDepth(1)
        this.scene.physics.world.enable(this)
        this.platforms = platforms

        this.anims.play('fall')
        if (this.body) {
            this.body.velocity.y = 1 //defaul fall
        }
        this.scene.add.existing(this)
    }

    public update(delta: number): void {
        super.update()

        if (this.body) {
            if (this.body.velocity.y == 0 && this.anims.currentAnim?.key != 'move') this.moving()
            else if (this.isFlying) this.flying()
            else this.falling()
        }

        for (let i = 0; i < this.getBullets().length; i++) {
            this.bullets[i].update(delta)
            const body = this.bullets[i].body
            if (body)
            {
                //console.log(body.velocity.y)
                if (body.velocity.y == 0)
                {
                    this.bullets[i].setVisible(false)
                }
            }
                
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
        this.delayFire += 0.5
        if (this.delayFire >= DELAY_FIRE_BULLET) {
            this.bullets.push(new Bullet(this.scene, this.x - 10, this.y + 95, 'bullet'))
            this.delayFire -= DELAY_FIRE_BULLET
            this.scene.physics.add.collider(this.bullets[this.bullets.length - 1], this.platforms)
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

    public getBullets(): Bullet[] {
        return this.bullets
    }
}
