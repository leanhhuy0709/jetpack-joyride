import * as Phaser from 'phaser'
import { FONT_NAME, SCENE } from '../const/const'

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
            .setDisplaySize((this.cameras.main.width * 5) / 12, (this.cameras.main.height / 12) * 5)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.add
            .text(1600, 1300, 'PRESS SPACE\n TO PLAY', {
                fontSize: '90px',
                fontFamily: FONT_NAME,
                align: 'center'
            })
            .setOrigin(0.5, 0.5).setShadow(5, 10)
    }

    public update(): void {
        if (this.cursors.space && this.cursors.space.isDown) {
            this.scene.start(SCENE.GAMEPLAY)
        }
    }
}
