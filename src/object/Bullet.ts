export default class Bullet extends Phaser.GameObjects.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setSize(20, 52)
        this.setDisplaySize(20, 52)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        if (this.body) {
            this.body.velocity.y = 1500
            this.body.velocity.x = Math.floor(Math.random() * 500) - 250
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
}
