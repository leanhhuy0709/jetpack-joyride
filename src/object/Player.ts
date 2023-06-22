import * as Phaser from 'phaser'
import Bullet from './Bullet'
import { DEPTH } from '../const/depth'
import Explosion from './Explosion'

const DELAY_FIRE_BULLET = 3
export default class Player extends Phaser.Physics.Matter.Sprite {
    private isFlying: boolean
    private bullets: Bullet[]
    private explosions: Explosion[]
    private delayFire: number

    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(200, 200)
        this.isFlying = false
        this.setFixedRotation()

        this.setAngularVelocity(0)

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

        this.setDepth(DEPTH.OBJECT_HIGH)

        this.anims.play('fall')
        if (this.body) {
            this.body.velocity.y = 0.1 //defaul fall
        }
        this.scene.add.existing(this)
        
        this.bullets = []
        this.explosions = []
        this.delayFire = DELAY_FIRE_BULLET

        this.setCollisionGroup(-2)
        
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
            const vY = this.bullets[i].getVelocity().y
            if (vY && Phaser.Math.FloorTo(Math.abs(vY)) == 0) {
                if (this.bullets[i].visible) {
                    this.explosions.push(
                        new Explosion(
                            this.scene,
                            this.bullets[i].x,
                            this.bullets[i].y + 30,
                            'explosion'
                        )
                    )
                }
                this.bullets[i].destroy()
                this.bullets.splice(i, 1)
                i--
            }
        }

        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update(delta)
        }

        if (this.y <= 300) this.y = 300
    }

    public flying(): void {
        if (this.body) {
            if (this.body.position.y <= 0) {
                this.body.position.y = 0
            } else {
                this.setVelocityY(-10)
                this.isFlying = true
                this.anims.play('fly')
            }
        }
        this.delayFire += 0.5
        if (this.delayFire >= DELAY_FIRE_BULLET) {
            this.bullets.push(new Bullet(this.scene, this.x - 10, this.y + 95, 'bullet'))
            this.delayFire -= DELAY_FIRE_BULLET
        }
    }

    public falling(): void {
        if (this.body && this.isFlying) {
            this.setVelocityY(0.1)
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
