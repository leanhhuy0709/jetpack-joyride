import * as Phaser from 'phaser'
import Bullet from './bullet/Bullet'
import { DEPTH } from '../const/depth'
import Explosion from './bullet/Explosion'
import ObjectPool from './ObjectPool'
import GamePlayScene from '../scenes/GamePlayScene'
import { IMAGE, SPRITE } from '../const/const'
import Equipment from './equipment/Equipment'
import UserData, { PRODUCT_STATE } from './shop/UserData'
import GravityBelt from './equipment/GravityBelt'

const DELAY_FIRE_BULLET = 5
export const DEFAULT_JUMP_VELO = -10

export enum PLAYER_STATE {
    FLYING,
    FALLING,
    MOVING,
    DEAD,
}
export default class Player extends Phaser.Physics.Matter.Sprite {
    public state: PLAYER_STATE
    private bullets: Bullet[]
    private explosions: Explosion[]
    private delayFire: number
    private speed: number
    private bulletFlash: Phaser.GameObjects.Sprite
    private jumpVelo: number = DEFAULT_JUMP_VELO
    private equipments: Equipment[]

    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(140, 160)
            .setRectangle(80, 150)
            .setFixedRotation()
            .setCollisionGroup(-2)
            .setDepth(DEPTH.OBJECT_VERYHIGH)
            .setOrigin(0.65, 0.5)

        this.initBullet()

        this.equipments = []

        this.state = PLAYER_STATE.MOVING
        this.scene.add.existing(this)
        this.createAnims(key)
    }

    private createAnims(key: string): void {
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
                repeat: 1,
            })
        if (!this.scene.anims.exists('fall'))
            this.scene.anims.create({
                key: 'fall',
                frames: this.anims.generateFrameNumbers(key, { start: 2, end: 2 }),
                frameRate: 10,
                repeat: 1,
            })
        if (!this.scene.anims.exists('flash'))
            this.scene.anims.create({
                key: 'flash',
                frames: this.bulletFlash.anims.generateFrameNumbers(SPRITE.BULLET_FLASH, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 10,
                repeat: -1,
            })
        this.anims.play('move')
        this.bulletFlash.play('flash')
    }

    private initBullet(): void {
        this.bullets = []
        this.explosions = []
        this.delayFire = DELAY_FIRE_BULLET
        this.speed = 0.5

        this.bulletFlash = this.scene.add
            .sprite(0, 0, SPRITE.BULLET_FLASH)
            .setDisplaySize(150, 150)
            .setDepth(DEPTH.OBJECT_HIGH)
    }

    public loadUserData(): void {
        for (let i = 0; i < UserData.getNumProduct(); i++) {
            if (UserData.getProductState(i) == PRODUCT_STATE.EQUIPPED) {
                switch (UserData.getProductName(i)) {
                    case 'Gravity Belt':
                        this.addEquipment(new GravityBelt(this))
                        break
                }
            }
        }
    }

    public update(delta: number): void {
        super.update()
        const glScene = this.scene as GamePlayScene

        this.x += delta * this.speed

        if (this.body) {
            if (glScene.matter.overlap(this, [glScene.ground]) && this.state != PLAYER_STATE.MOVING)
                this.moving()
            else if (this.state == PLAYER_STATE.FLYING) this.flying()
            else if (this.state == PLAYER_STATE.FALLING) this.falling()
        }

        this.updateBullet(delta)

        for (let i = 0; i < this.equipments.length; i++) this.equipments[i].update(delta)
    }

    private updateBullet(delta: number) {
        const glScene = this.scene as GamePlayScene

        for (let i = 0; i < this.getBullets().length; i++) {
            this.bullets[i].update(delta)

            if (glScene.matter.overlap(this.bullets[i], [glScene.ground])) {
                this.explosions.push(
                    ObjectPool.getExplosion(
                        this.scene,
                        this.bullets[i].x,
                        this.bullets[i].y,
                        SPRITE.EXPLOSION
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
            this.bullets.push(
                ObjectPool.getBullet(this.scene, this.x - 10, this.y + 95, IMAGE.BULLET)
            )
            this.delayFire -= DELAY_FIRE_BULLET
        }
    }

    public flying(): void {
        if (this.body) {
            if (this.body.position.y <= 0) {
                this.body.position.y = 0
            } else {
                if (this.getVelocity()) {
                    if (this.getVelocity() && (this.getVelocity().y as number) > this.jumpVelo) {
                        this.setVelocityY(Number(this.getVelocity().y) + this.jumpVelo / 20)
                    } else this.setVelocityY(this.jumpVelo)
                }

                this.state = PLAYER_STATE.FLYING
                this.anims.play('fly')
            }
        }
        this.fireBullet()
        this.bulletFlash.setVisible(true)

        for (let i = 0; i < this.equipments.length; i++) this.equipments[i].flying()
    }

    public falling(): void {
        if (this.body && this.state == PLAYER_STATE.FLYING) {
            this.setVelocityY(-5)
            this.state = PLAYER_STATE.FALLING
            this.anims.play('fall')
        }
        this.bulletFlash.setVisible(false)

        for (let i = 0; i < this.equipments.length; i++) this.equipments[i].falling()
    }

    public moving(): void {
        this.anims.play('move')
        this.state = PLAYER_STATE.MOVING
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

    public setJumpVelo(jumpVelo: number): void {
        this.jumpVelo = jumpVelo
    }

    public getJumpVelo(): number {
        return this.jumpVelo
    }

    public addEquipment(equipment: Equipment): void {
        equipment.init()
        this.equipments.push(equipment)
    }

    public getEquipments(): Equipment[] {
        return this.equipments
    }

    public removeEquipment(type: typeof Equipment): void {
        for (let i = 0; i < this.equipments.length; i++) {
            if (this.equipments[i] instanceof type) {
                this.equipments[i].remove()
                this.equipments.splice(i, 1)
                break
            }
        }
    }
}
