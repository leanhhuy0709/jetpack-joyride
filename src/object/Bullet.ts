import { DEPTH } from "../const/depth"

export default class Bullet extends Phaser.Physics.Matter.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        scene.add.existing(this)
        this.setCollisionGroup(-2)

        this.setDisplaySize(20 * 1.2, 52 * 1.2)
        this.setDepth(DEPTH.OBJECT_LOW)
        if (this.body) {
            const vX = Phaser.Math.Between(-10, 10)
            const vY = 30
            this.setVelocityY(vY)
            this.setVelocityX(vX)
        }
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

    public setScene(scene: Phaser.Scene): void 
    {
        this.scene = scene
    }

    public setAll(scene: Phaser.Scene, x: number, y: number, key: string)
    {
        //scene.add.existing(this)

        this.x = x
        this.y = y
        this.setTexture(key)

        if (this.body) {
            const vX = Phaser.Math.Between(-10, 10)
            const vY = 30
            this.setVelocityY(vY)
            this.setVelocityX(vX)
        }       

        this.x += Phaser.Math.Between(-10, 10)
        
        this.setCollisionGroup(-2)
    }
}
