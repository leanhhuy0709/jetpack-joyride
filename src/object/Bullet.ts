import { DEPTH } from "../const/depth"

export default class Bullet extends Phaser.Physics.Matter.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(20 * 1.2, 52 * 1.2)

        this.setDepth(DEPTH.OBJECT_LOW)

        scene.add.existing(this)

        if (this.body) {
            const vX = Phaser.Math.Between(-10, 10)
            const vY = 30
            this.setVelocityY(vY)
            this.setVelocityX(vX)
        }       

        this.x += Phaser.Math.Between(-10, 10)
        
        this.setCollisionGroup(-2)
    }

    public update(delta: number): void {
        super.update()
        if (this.body)
        {
            if (this.body.velocity.y == 0)
            {
                this.x -= delta * 0.5
                this.body.position.x -= delta * 0.5
            }
        }
        
    }
}
