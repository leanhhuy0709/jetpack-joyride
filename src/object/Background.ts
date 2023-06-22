export default class Background {
    private scene: Phaser.Scene
    private image1: Phaser.GameObjects.Image
    private image2: Phaser.GameObjects.Image
    private position: number

    public constructor(scene: Phaser.Scene, key: string) {
        //super(scene, x, y, texture, frame)
        //this.setDisplaySize(512 * 1600 / 360, 360 * 1600 / 360).setOrigin(0, 0)
        this.scene = scene
        this.position = 0
        this.image1 = this.scene.add.image(this.position, 0, key).setOrigin(0, 0)
        this.image2 = this.scene.add
            .image(this.position + this.image1.width, 0, key)
            .setOrigin(0, 0)
    }

    public update(delta: number, playerSpeed: number): void {
        this.position -= delta * playerSpeed

        if (this.position + this.image1.width <= 0)
            this.position += this.image1.width

        this.image1.x = this.position
        this.image2.x = this.position + this.image1.width
    }
}
