import * as Phaser from 'phaser'
import { SCENE, TITLE, TITLE_GLOW } from '../const/const'
import Button from '../components/Button'

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
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, TITLE_GLOW)
            .setDisplaySize(
                (this.cameras.main.width * 5) / 10 + 100,
                (this.cameras.main.height / 10) * 5 + 100
            )

        this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, TITLE)
            .setDisplaySize((this.cameras.main.width * 5) / 10, (this.cameras.main.height / 10) * 5)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.add.rectangle(0, 0, 800, 1600, 0x01234).setOrigin(0, 0)

        const shopBtn = new Button(this, 400, 100, 500, 150, 'SHOP', {
            fontSize: '90px',
            fontStyle: 'bold',
        })

        shopBtn.setInteractive()

        const powerUpBtn = new Button(this, 400, 300, 500, 150, 'POWER-UPS', {
            fontSize: '90px',
            fontStyle: 'bold',
        })

        powerUpBtn.setInteractive()

        const costumesBtn = new Button(this, 400, 500, 500, 150, 'COSTUMES', {
            fontSize: '90px',
            fontStyle: 'bold',
        })

        costumesBtn.setInteractive()

        this.add.rectangle(2400, 0, 600, 125, 0x01234).setOrigin(0, 0)

        let allCoin = 0
        if (localStorage.getItem('allCoin')) allCoin = Number(localStorage.getItem('allCoin'))

        new Button(this, 2580, 100 / 2 + 12.5, 300, 100, String(allCoin), {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        const settingBtn = new Button(this, 2880, 100 / 2 + 12.5, 200, 100, 'Setting', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        settingBtn.setInteractive()
    }

    public update(): void {
        if (this.cursors.space && this.cursors.space.isDown) {
            this.scene.start(SCENE.GAMEPLAY)
        }
    }
}
