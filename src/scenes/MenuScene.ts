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
            .image(1700, this.cameras.main.height / 2, TITLE_GLOW)
            .setDisplaySize(
                (this.cameras.main.width * 5) / 10 + 100,
                (this.cameras.main.height / 10) * 5 + 100
            )

        this.add
            .image(1600, this.cameras.main.height / 2, TITLE)
            .setDisplaySize((this.cameras.main.width * 5) / 10, (this.cameras.main.height / 10) * 5)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.add.rectangle(0, 0, 500, 1600, 0x01234).setOrigin(0, 0)

        let highScore = 0
        if (localStorage.getItem('highscore')) highScore = Number(localStorage.getItem('highscore'))

        const text = this.add
            .text(250, 100, `BEST: ${Math.floor(highScore)}`, {
                fontSize: '50px',
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)
        text.setStroke('#000000', 1)

        const shopBtn = new Button(this, 250, 300, 300, 100, 'SHOP', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        shopBtn.setInteractive()

        const powerUpBtn = new Button(this, 250, 500, 300, 100, 'POWER-UPS', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        powerUpBtn.setInteractive()

        const costumesBtn = new Button(this, 250, 700, 300, 100, 'COSTUMES', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        costumesBtn.setInteractive()

        const halfBrickBtn = new Button(this, 250, 900, 300, 100, 'HALFBRICK', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        halfBrickBtn.setInteractive()

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
