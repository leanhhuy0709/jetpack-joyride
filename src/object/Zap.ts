import Obstacle from './Obstacle'

export default class Zap extends Obstacle {
    private sprite1: Phaser.Physics.Matter.Sprite
    private sprite2: Phaser.Physics.Matter.Sprite
    private isSpin: boolean
    public constructor(scene: Phaser.Scene, x1: number, y1: number, x2: number, y2: number) {
        super(scene)
        this.sprite1 = scene.matter.add
            .sprite(x1, y1, 'zap', 0, { isStatic: true })
            .setDisplaySize(75 * 2, 58 * 2)
        this.sprite2 = scene.matter.add
            .sprite(x2, y2, 'zap', 0, { isStatic: true })
            .setDisplaySize(75 * 2, 58 * 2)

        this.sprite1.setStatic(true)
        this.sprite2.setStatic(true)

        //this.sprite1.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
        //this.sprite2.setRotation(-Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))

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

        this.rect = scene.matter.add.sprite((x1 + x2) / 2, (y1 + y2) / 2, 'light1', 0, {
            isStatic: true,
        }).setOrigin(0.5, 0.5)

        this.sprite1.setCollisionGroup(-2)
        this.sprite2.setCollisionGroup(-2)
        this.rect.setCollisionGroup(-2)

        if (Phaser.Math.Between(0, 10) == 10) this.isSpin = false
        else this.isSpin = false
    }

    public update(delta: number): void {
        //
        this.sprite1.x -= delta / 2
        this.sprite2.x -= delta / 2

        //spin
        if (this.isSpin) {
            //do something
            let x = (this.sprite1.x + this.sprite2.x) / 2,
                y = (this.sprite1.y + this.sprite2.y) / 2,
                x1 = this.sprite1.x,
                y1 = this.sprite1.y,
                x2 = this.sprite2.x,
                y2 = this.sprite2.y

            const spinSpeed = 0.0001

            this.sprite1.x =
                x +
                (x1 - x) * Math.cos(delta * spinSpeed * Math.PI) -
                (y1 - y) * Math.sin(delta * spinSpeed * Math.PI)
            this.sprite1.y =
                y +
                (x1 - x) * Math.sin(delta * spinSpeed * Math.PI) +
                (y1 - y) * Math.cos(delta * spinSpeed * Math.PI)
            this.sprite2.x =
                x +
                (x2 - x) * Math.cos(delta * spinSpeed * Math.PI) -
                (y2 - y) * Math.sin(delta * spinSpeed * Math.PI)
            this.sprite2.y =
                y +
                (x2 - x) * Math.sin(delta * spinSpeed * Math.PI) +
                (y2 - y) * Math.cos(delta * spinSpeed * Math.PI)

            x = (this.sprite1.x + this.sprite2.x) / 2
            y = (this.sprite1.y + this.sprite2.y) / 2
            x1 = this.sprite1.x
            y1 = this.sprite1.y
            x2 = this.sprite2.x
            y2 = this.sprite2.y

            if (x2 == x1) x2 += 0.00000000001
            this.sprite1.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
            this.sprite2.setRotation(-Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
            this.rect.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
        }
        this.resetRect()
    }

    public resetRect(): void {
        this.rect.x = (this.sprite1.x + this.sprite2.x) / 2
        this.rect.y = (this.sprite1.y + this.sprite2.y) / 2
    }

    public reset(minX: number): void {
        const x1 = minX + Phaser.Math.Between(0, 300)
        const x2 = x1 + Phaser.Math.Between(150, 450)
        const y1 = Phaser.Math.Between(500, 1000)
        const y2 = Phaser.Math.Between(500, 1000)
        this.sprite1.setRotation(Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
        this.sprite2.setRotation(-Math.PI / 2 + Math.atan((y2 - y1) / (x2 - x1)))
        this.set(x1, y1, x2, y2)
    }

    public set(x1: number, y1: number, x2: number, y2: number): void {
        if (x1 > x2) {
            let tmp = x1
            x1 = x2
            x2 = tmp
            tmp = y1
            y1 = y2
            y2 = tmp
        }

        this.sprite1.x = x1
        this.sprite2.x = x2
        this.sprite1.y = y1
        this.sprite2.y = y2
        this.resetRect()
        this.rect.setRotation(0)
        this.rect.setDisplaySize(75, Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2))
        this.rect.setRotation(Math.PI/2 + Math.atan((y2 - y1) / (x2 - x1)))
    }

    public maxX(): number {
        return this.sprite2.x > this.sprite1.x ? this.sprite2.x : this.sprite1.x
    }

    public minX(): number {
        return this.sprite2.x < this.sprite1.x ? this.sprite2.x : this.sprite1.x
    }

    public maxY(): number {
        return this.sprite2.y > this.sprite1.y ? this.sprite2.y : this.sprite1.y
    }

    public minY(): number {
        return this.sprite2.y < this.sprite1.y ? this.sprite2.y : this.sprite1.y
    }

    public getBody(): Phaser.Types.Physics.Matter.MatterBody[] {
        return [this.sprite1, this.sprite2, this.rect]
    }
}
