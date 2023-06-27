import { SPRITE } from '../../const/const'
import { DEPTH } from '../../const/depth'
import Player from '../Player'
import Obstacle from './Obstacle'

export default class Rocket extends Obstacle {
    private fire: Phaser.Physics.Matter.Sprite
    private alert: Phaser.GameObjects.Sprite
    private speed: number
    private isWaiting: boolean
    public constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene)
        this.rect = this.scene.matter.add
            .sprite(x, y, SPRITE.ROCKET, undefined, { isStatic: true })
            .setScale(3)
            .setRectangle(85, 50)
            .setStatic(true)
            .setDepth(DEPTH.OBJECT_MEDIUM)

            .setCollisionGroup(-2)

        if (!this.scene.anims.exists('rocket-turn'))
            this.scene.anims.create({
                key: 'rocket-turn',
                frames: this.rect.anims.generateFrameNumbers(SPRITE.ROCKET, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 10,
                repeat: -1,
            })

        this.rect.anims.play('rocket-turn')

        this.fire = this.scene.matter.add
            .sprite(x + 80, y, SPRITE.ROCKET_EFFECT, undefined, { isStatic: true })
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setScale(2)
            .setRectangle(85, 50)
            .setStatic(true)

        if (!this.scene.anims.exists('rocket-fire'))
            this.scene.anims.create({
                key: 'rocket-fire',
                frames: this.rect.anims.generateFrameNumbers(SPRITE.ROCKET_EFFECT, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 10,
                repeat: -1,
            })

        this.fire.anims.play('rocket-fire')

        this.alert = this.scene.add
            .sprite(x, y, SPRITE.ROCKET_ALERT)
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setScale(2.5)

        if (!this.scene.anims.exists('alert'))
            this.scene.anims.create({
                key: 'alert',
                frames: this.alert.anims.generateFrameNumbers(SPRITE.ROCKET_ALERT, {
                    start: 0,
                    end: 7,
                }),
                frameRate: 5,
                repeat: 0,
            })

        this.speed = 15
        this.isWaiting = false
    }

    public update(_delta: number, player: Player | undefined = undefined): void {
        if (this.isWaiting && this.alert.anims.isPlaying) {
            //follow player
            const d = 2
            if (player) {
                if (Math.abs(player.y - this.alert.y) < d) this.alert.y = player.y
                if (player.y > this.alert.y) this.alert.y += d
                else if (player.y < this.alert.y) this.alert.y -= d
            }
            this.rect.y = this.fire.y = this.alert.y
        }
        if (this.isWaiting && !this.alert.anims.isPlaying) {
            if (!this.rect.visible) {
                this.rect.setVisible(true)
                this.fire.setVisible(true)
                this.alert.setVisible(false)
            }
            this.rect.x -= this.speed
            this.fire.x -= this.speed
        }
    }

    public reset(minX: number): void {
        this.rect.x = minX + 100
        this.fire.x = minX + 80 + 100
        this.alert.x = minX
        const y = Phaser.Math.Between(400, 600)
        this.rect.y = y
        this.fire.y = y
        this.alert.y = y
        this.isWaiting = false

        this.rect.setVisible(false)
        this.fire.setVisible(false)
        this.alert.setVisible(true)
    }

    public maxX(): number {
        return this.fire.x + this.fire.width
    }

    public maxY(): number {
        return this.fire.y + this.fire.height
    }

    public minX(): number {
        return this.rect.x
    }

    public minY(): number {
        return this.rect.y
    }

    public getBody(): Phaser.Types.Physics.Matter.MatterBody[] {
        return [this.rect, this.fire]
    }

    public startAlert(): void {
        this.alert.play('alert')
        this.isWaiting = true
    }

    public setAll(scene: Phaser.Scene, x: number, y: number): void {
        this.scene = scene
        this.rect.x = x + 100
        this.fire.x = x + 80 + 100
        this.alert.x = x

        this.rect.y = y
        this.fire.y = y
        this.alert.y = y

        this.isWaiting = false
        this.rect.setVisible(false)
        this.fire.setVisible(false)
        this.alert.setVisible(true)
    }
}
