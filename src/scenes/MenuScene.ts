import * as Phaser from 'phaser'
import { SCENE, IMAGE } from '../const/const'
import Button from '../components/Button'
import { DEPTH } from '../const/depth'

export default class MenuScene extends Phaser.Scene {
    private cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }

    private logo: Phaser.GameObjects.Image
    private logoGlow: Phaser.GameObjects.Image

    private rect: Phaser.GameObjects.Rectangle
    private coinRect: Button
    private settingBtn: Button

    private isSpaceClicked: boolean

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
            .image(2155, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
        this.add
            .image(500, 0, IMAGE.START_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 1749, 1200)
            .setDisplaySize((1749 * 1600) / 1200, (1600 * 1600) / 1200)

        this.logoGlow = this.add
            .image(1750, 830, IMAGE.TITLE_GLOW)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(3)

        this.logo = this.add
            .image(1800, 800, IMAGE.TITLE)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(1.5)

        this.add
            .image(1700, 1150, IMAGE.BEST_SCREEN)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(1.5)

        this.add.image(500, 400, IMAGE.LIGHT).setDepth(DEPTH.BACKGROUND_VERYHIGH).setScale(1.7)

        this.add
            .image(1010, 1365, IMAGE.LIGHT_EFFECT_1)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(1.7)
        this.add
            .image(1000, 525, IMAGE.LIGHT_EFFECT_2)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(1.7)

        this.add.image(1100, 1220, IMAGE.TABLE).setDepth(DEPTH.BACKGROUND_VERYHIGH).setScale(4.4)
        this.add.image(1110, 1120, IMAGE.RADIO).setDepth(DEPTH.BACKGROUND_VERYHIGH).setScale(2)

        this.add
            .image(1600 + 500, 600, IMAGE.ALARM_LIGHT)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)
            .setScale(1.5)

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

        this.rect = this.add.rectangle(2400, 0, 600, 125, 0x01234).setOrigin(0, 0)

        let allCoin = 0
        if (localStorage.getItem('allCoin')) allCoin = Number(localStorage.getItem('allCoin'))

        this.coinRect = new Button(this, 2580, 100 / 2 + 12.5, 300, 100, String(allCoin), {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        this.settingBtn = new Button(this, 2880, 100 / 2 + 12.5, 200, 100, 'Setting', {
            fontSize: '50px',
            fontStyle: 'bold',
        })

        this.settingBtn.setInteractive()

        this.isSpaceClicked = false
    }

    public update(): void {
        if (this.cursors.space && this.cursors.space.isDown && !this.isSpaceClicked) {
            this.isSpaceClicked = true
            this.tweens.add({
                targets: this.logo,
                alpha: 0,
                duration: 300,
            })
            this.tweens.add({
                targets: this.logoGlow,
                alpha: 0,
                duration: 300,
            })
            this.tweens.add({
                targets: this.rect,
                y: -150,
                duration: 300,
            })
            this.tweens.add({
                targets: this.coinRect.getText(),
                y: 100 / 2 + 12.5 - 150,
                duration: 300,
            })
            this.tweens.add({
                targets: this.coinRect.getRectangle(),
                y: 100 / 2 + 12.5 - 150,
                duration: 300,
            })
            this.tweens.add({
                targets: this.settingBtn.getText(),
                y: 100 / 2 + 12.5 - 150,
                duration: 300,
            })
            this.tweens.add({
                targets: this.settingBtn.getRectangle(),
                y: 100 / 2 + 12.5 - 150,
                duration: 300,
            })

            const scene = this.scene
            this.tweens.add({
                targets: this.cameras.main,
                scrollX: 500,
                duration: 500,
                onComplete: () => {
                    setTimeout(() => {
                        scene.start(SCENE.GAMEPLAY)
                    }, 200)
                },
            })
        }
    }
}
