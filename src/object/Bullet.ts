import { DEPTH } from "../const/depth"

export default class Bullet extends Phaser.Physics.Matter.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene.matter.world, x, y, key)
        this.setDisplaySize(20 * 1.2, 52 * 1.2)
        this.setDepth(DEPTH.OBJECT_LOW)
        scene.add.existing(this)
        this.setCollisionGroup(-2)

        
        
        this.setAll(scene, x, y, key)
    }
    
    public setAll(scene: Phaser.Scene, x: number, y: number, key: string)
    {
        this.setRotation(0)
        this.setFixedRotation()
        this.setPosition(x + Phaser.Math.Between(-10, 10), y)
        this.setTexture(key)

        if (this.body) {
            const vX = Phaser.Math.Between(-10, 10)
            const vY = 30
            this.setVelocityY(vY)
            this.setVelocityX(vX)
        }
    }
}
