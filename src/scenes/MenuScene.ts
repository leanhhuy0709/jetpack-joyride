import * as Phaser from 'phaser'
import { SCENE } from '../const/const'

export default class MenuScene extends Phaser.Scene {
    private cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }
    public constructor() {
        super({
            key: SCENE.MENU,
        })
    }

    public preload(): void {
        //
    }

    public create(): void {
        this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)

        this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo')
            .setDisplaySize(this.cameras.main.width / 2, this.cameras.main.height / 2)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()
    }

    public update(): void {
        if (this.cursors.left.isDown) {
            console.log('left')
        } else if (this.cursors.right.isDown) {
            console.log('right')
        } else if (this.cursors.space && this.cursors.space.isDown) {
            console.log('space')
            this.scene.start('GamePlayScene')
        }
    }
}
