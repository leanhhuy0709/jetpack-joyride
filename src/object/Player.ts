import * as Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame)

        // Thêm player vào scene
        scene.add.existing(this)
    }
}
