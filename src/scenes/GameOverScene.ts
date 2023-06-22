import * as Phaser from 'phaser'
import { FONT_NAME, SCENE } from '../const/const'
import Button from '../components/Button'

export default class GameOverScene extends Phaser.Scene {
    private playAgainBtn: Button
    private homeBtn: Button

    public constructor() {
        super({
            key: SCENE.GAMEOVER,
        })
    }

    public preload(): void {
        //
    }

    public create(): void {
        const image = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        image.setTint(0x555555)

        this.add.rectangle(600 + 500, 100 + 100 / 2, 950, 1250, 0x8aa1c0).setOrigin(0.5, 0)
        this.add.rectangle(600 + 500, 100 + 100 / 2, 930, 1240, 0x242c46).setOrigin(0.5, 0)

        this.add.rectangle(2100, 600, 950, 800, 0x8aa1c0).setOrigin(0.5, 0)
        this.add.rectangle(2100, 610, 930, 780, 0x242c46).setOrigin(0.5, 0)

        this.add.rectangle(600 + 500, 100 + 100 / 2, 1000, 100, 0x575f61)

        const text = this.add
            .text(600 + 500, 100 + 100 / 2, 'RESULTS', {
                fontSize: '80px',
                fontFamily: FONT_NAME,
            })
            .setOrigin(0.5, 0.5)
        text.setStroke('#000000', 10)

        const text2 = this.add
            .text(600 + 500, 275, 'DISTANCE', {
                fontSize: '80px',
                fontFamily: FONT_NAME,
            })
            .setOrigin(0.5, 0.5)
        text2.setStroke('#000000', 10)

        let currScore = 0
        if (localStorage.getItem('score'))
        {
            currScore = Number(localStorage.getItem('score'))
        }

        const text3 = this.add
            .text(600 + 500, 400, `${currScore}M`, {
                fontSize: '125px',
                fontFamily: FONT_NAME,
                color: '#fef03b'
            })
            .setOrigin(0.5, 0.5)
        text3.setStroke('#000000', 10)

        const text4 = this.add
            .text(700, 600, 'COLLECTED', {
                fontSize: '60px',
                fontFamily: FONT_NAME
            })
            .setOrigin(0, 0.5)
        text4.setStroke('#000000', 10)

        const text5 = this.add
            .text(1450, 600, '96', {
                fontSize: '60px',
                fontFamily: FONT_NAME,
                color: '#fef03b'
            })
            .setOrigin(1, 0.5)
        text5.setStroke('#000000', 10)

        this.add.image(1500, 600, 'coin').setDisplaySize(60, 60)

        this.playAgainBtn = new Button(this, 2100, 800, 650, 200, 0x575f61, 'PLAY AGAIN', {
            color: '#ffffff',
            fontSize: '100px',
            fontFamily: FONT_NAME,
        })
        this.playAgainBtn.setInteractive()

        this.homeBtn = new Button(this, 2100, 1100, 650, 200, 0x575f61, 'HOME', {
            color: '#ffffff',
            fontSize: '100px',
            fontFamily: FONT_NAME,
        })
        this.homeBtn.setInteractive()
    }

    public update(): void {
        if (this.homeBtn.getIsPointerDown())
        {
            this.scene.start(SCENE.MENU)
        }
        else if (this.playAgainBtn.getIsPointerDown())
        {
            this.scene.start(SCENE.GAMEPLAY)
        }
    }
}
