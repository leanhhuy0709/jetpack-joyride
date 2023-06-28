import * as Phaser from 'phaser'
import { SCENE, IMAGE, FONT_NAME } from '../const/const'
import Button from '../components/Button'
import { DEPTH } from '../const/depth'
import StartBackground from '../object/background/StartBackground'

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

    private adsBtn: Button
    private shopBtn: Button
    private powerUpBtn: Button
    private costumesBtn: Button
    private halfBrickBtn: Button

    private playBtn: Button

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

        new StartBackground(this, 500, false)

        this.add.image(870, 1300, IMAGE.DO_NOT_TOUCH).setDepth(DEPTH.OBJECT_VERYHIGH).setScale(1.7)

        this.logoGlow = this.add
            .image(1750, 830, IMAGE.TITLE_GLOW)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(3)

        this.logo = this.add
            .image(1800, 800, IMAGE.TITLE)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)
            .setScale(1.5)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.add.rectangle(0, 0, 500, 1600, 0x01234).setOrigin(0, 0)

        this.adsBtn = new Button(this, 250, 100, 300, 100, 'ADS', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.adsBtn.setInteractive()

        this.shopBtn = new Button(this, 250, 300, 300, 100, 'SHOP', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.shopBtn.setInteractive()

        this.powerUpBtn = new Button(this, 250, 500, 300, 100, 'POWER-UPS', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.powerUpBtn.setInteractive()

        this.costumesBtn = new Button(this, 250, 700, 300, 100, 'COSTUMES', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.costumesBtn.setInteractive()

        this.halfBrickBtn = new Button(this, 250, 900, 300, 100, 'HALFBRICK', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.halfBrickBtn.setInteractive()

        this.playBtn = new Button(this, 1800, 1300, 300, 100, 'PLAY', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.playBtn.setInteractive()

        this.rect = this.add
            .rectangle(2400, 0, 600, 125, 0x01234)
            .setOrigin(0, 0)
            .setDepth(DEPTH.OBJECT_LOW)

        let allCoin = 0
        if (localStorage.getItem('allCoin')) allCoin = Number(localStorage.getItem('allCoin'))

        this.coinRect = new Button(this, 2580, 100 / 2 + 12.5, 300, 100, String(allCoin), {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.settingBtn = new Button(this, 2880, 100 / 2 + 12.5, 200, 100, 'Setting', {
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME
        })

        this.settingBtn.setInteractive()

        this.isSpaceClicked = false
        this.input.addPointer(1)
    }

    public update(): void {
        //Check button first ... else ...

        if (this.adsBtn.getIsPointerDown())
        {
            window.open('https://www.youtube.com/watch?v=Jzxi8nid9BQ', '_blank')
            this.adsBtn.setIsPointerDown(false)
            return
        }

        if (this.halfBrickBtn.getIsPointerDown())
        {
            window.open('https://www.halfbrick.com/', '_blank')
            this.halfBrickBtn.setIsPointerDown(false)
            return
        }
        


        if (
            this.playBtn.getIsPointerDown() &&
            !this.isSpaceClicked
        ) {
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
            this.tweens.add({
                targets: this.playBtn.getRectangle(),
                alpha: 0,
                duration: 300,
            })
            this.tweens.add({
                targets: this.playBtn.getText(),
                alpha: 0,
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
