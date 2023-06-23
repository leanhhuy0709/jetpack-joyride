import * as Phaser from 'phaser'
import Bullet from './Bullet'
import { DEPTH } from '../const/depth'
import Explosion from './Explosion'
import ObjectPool from './ObjectPool'
import GamePlayScene from '../scenes/GamePlayScene'

const DELAY_FIRE_BULLET = 5
export default class Player extends Phaser.Physics.Matter.Sprite {
    private isFlying: boolean
    private bullets: Bullet[]
    private explosions: Explosion[]
    private delayFire: number
    private speed: number
    private bulletFlash: Phaser.Physics.Matter.Sprite

    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(200, 200)
        this.isFlying = false
        this.setFixedRotation()

        this.setAngularVelocity(0)

        if (!this.scene.anims.exists('move'))
            this.scene.anims.create({
                key: 'move',
                frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1,
            })
        if (!this.scene.anims.exists('fly'))
            this.scene.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers(key, { start: 3, end: 3 }),
                frameRate: 10,
                repeat: -1,
            })
        if (!this.scene.anims.exists('fall'))
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
        this.speed = 0.5

        this.bulletFlash = this.scene.matter.add.sprite(x, y, 'bullet-flash').setDisplaySize(150, 150)
        this.bulletFlash.setCollisionGroup(-2)
        if (!this.scene.anims.exists('flash'))
            this.scene.anims.create({
                key: 'flash',
                frames: this.bulletFlash.anims.generateFrameNumbers('bullet-flash', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            })
        
        this.bulletFlash.setStatic(true)

        this.bulletFlash.play('flash')
    }

    public update(delta: number): void {
        super.update()

        if (this.body) {
            if (
                Math.floor(Math.abs(this.body.velocity.y) * 100) / 100 == 0 &&
                this.anims.currentAnim?.key != 'move'
            )
                this.moving()
            else if (this.isFlying) this.flying()
            else this.falling()
        }

        for (let i = 0; i < this.getBullets().length; i++) {
            this.bullets[i].update(delta)
            const glScene = this.scene as GamePlayScene

            if (glScene.matter.overlap(this.bullets[i], [glScene.ground])) {
                this.explosions.push(
                    ObjectPool.getExplosion(
                        this.scene,
                        this.bullets[i].x,
                        this.bullets[i].y,
                        'explosion'
                    )
                )

                ObjectPool.removeBullet(this.bullets[i])
                this.bullets.splice(i, 1)
                i--
            }
        }
        let countRemovedExplosion = 0
        for (let i = 0; i < this.explosions.length; i++) {
            if (this.explosions[i].alpha == 0) {
                ObjectPool.removeExplosion(this.explosions[i])
                countRemovedExplosion++
            } else break
        }
        if (countRemovedExplosion > 0) this.explosions.splice(0, countRemovedExplosion)

        if (this.y <= 300) this.y = 300
        this.bulletFlash.setPosition(this.x - 11, this.y + 135)
    }

    public fireBullet(): void {
        this.delayFire += 0.5
        if (this.delayFire >= DELAY_FIRE_BULLET) {
            this.bullets.push(ObjectPool.getBullet(this.scene, this.x - 10, this.y + 95, 'bullet'))
            //this.bullets.push(new Bullet(this.scene, this.x - 10, this.y + 95, 'bullet'))
            this.delayFire -= DELAY_FIRE_BULLET
        }
    }

    public flying(): void {
        if (this.body) {
            if (this.body.position.y <= 0) {
                this.body.position.y = 0
            } else {
                if (this.getVelocity()) {
                    if (this.getVelocity() && (this.getVelocity().y as number) > -10) {
                        this.setVelocityY(Number(this.getVelocity().y) - 0.5)
                    } else this.setVelocityY(-10)
                }

                this.isFlying = true
                this.anims.play('fly')
            }
        }
        this.fireBullet()
        this.bulletFlash.setVisible(true)
    }

    public falling(): void {
        if (this.body && this.isFlying) {
            this.setVelocityY(0.1)
            this.isFlying = false
            this.anims.play('fall')
        }
        this.bulletFlash.setVisible(false)
    }

    public moving(): void {
        this.anims.play('move')
    }

    public getBullets(): Bullet[] {
        return this.bullets
    }

    public getSpeed(): number {
        return this.speed
    }

    public setSpeed(speed: number): void {
        this.speed = speed
    }
}
