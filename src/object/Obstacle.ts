export default class Obstacle extends Phaser.GameObjects.Sprite {
    public constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        this.setSize(220, 400)
        this.setDisplaySize(220, 400)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, true)
    }

    public update(_delta: number): void {
        super.update()
    }

    public reset(x: number, y: number): void {
        this.x = x + this.width / 2
        this.y = y + this.height / 2
        if (this.body) {
            this.body.position.x = x
            this.body.position.y = y
        }
    }
}
