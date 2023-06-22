export default abstract class Obstacle {
    
    protected scene: Phaser.Scene
    public rect: Phaser.Physics.Matter.Sprite

    public constructor(scene: Phaser.Scene) {
        this.scene = scene
        /*
        this.setSize(220, 400)
        this.setDisplaySize(220, 400)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, true)

        if (this.body) {
            this.body.position.x += RESIZE_OBSTACLE
            this.body.position.y += RESIZE_OBSTACLE

            const body = this.body as Phaser.Physics.Arcade.StaticBody
            body.setSize(220 - RESIZE_OBSTACLE * 2, 400 - RESIZE_OBSTACLE * 2)
        }
        */
    }

    public update(_delta: number): void {
        //
    }

    public reset(_minX: number): void {
        //
    }
}
