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
        //this.load.image('logo', 'assets/images/Jetpack_Joyride_Logo.png')
        this.load.image('logo', 'assets/images/JetpackJoyride.webp')
        //this.load.image('logo', 'assets/images/1.png')
        this.load.image('bg', 'assets/images/2.png')
    }

    public create(): void {
        this.add
            .image(400, 200, 'bg').setDisplaySize(800, 400)

        

        const image = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo')//.setScale(0.7)//setDisplaySize(400, 232.5)

        //image.setSize(400, 232.5)
        //image.setDisplaySize(400, 232.5)
        //image.setSizeToFrame(true)
        
            
        const setting = this.add.rectangle(700, 25, 200, 50, 0x2b2e38)

        const coinNum = this.add.text((this.cameras.main.width * 3) / 4, 0, '7922')
        coinNum.setFontSize('20px')

        const settingText = this.add.text(700, 0, 'Setting')
        coinNum.setFontSize('20px')

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
