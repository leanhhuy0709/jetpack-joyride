import * as Phaser from 'phaser'

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
            key: 'MenuScene',
        })
    }

    public preload(): void {
        //
    }

    public create(): void {
        const rect = this.add.rectangle(
            0,
            0,
            this.cameras.main.width / 2,
            this.cameras.main.height * 2,
            0xf123
        )
        rect.setInteractive()

        const logo = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            110,
            0xffff
        )
        const logoText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Jetpack Joyride'
        )
        logoText.setColor('#000000')
        logoText.setFontSize("30px")
        logoText.setOrigin(0.5, 0.5)

        const setting = this.add.rectangle(
            700,
            25,
            200,
            50,
            0x3456
        )
    
        const coinNum = this.add.text(
            this.cameras.main.width * 3 / 4,
            0,
            '7922'
        )
        coinNum.setColor('#000000')
        coinNum.setFontSize("20px")

        const settingText = this.add.text(
            700,
            0,
            'Setting'
        )
        coinNum.setColor('#000000')
        coinNum.setFontSize("20px")

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

    }

    public update(): void {
        if (this.cursors.left.isDown) {
            console.log('left')
        } else if (this.cursors.right.isDown) {
            console.log('right')
        }
        else if (this.cursors.space && this.cursors.space.isDown) {
            console.log('space')
        }
    }
}
