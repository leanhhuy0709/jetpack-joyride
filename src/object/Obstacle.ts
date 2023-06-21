const RESIZE_OBSTACLE = 30
export default class Obstacle extends Phaser.GameObjects.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
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
    }

    public update(_delta: number): void {
        super.update()
    }

    public reset(x: number, y: number): void {
        this.x = x + this.width / 2
        this.y = y + this.height / 2
        if (this.body) {
            this.body.position.x = x + RESIZE_OBSTACLE
            this.body.position.y = y + RESIZE_OBSTACLE
        }
    }
}
