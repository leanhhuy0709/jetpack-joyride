import * as Phaser from 'phaser'
import { COIN, FONT_NAME, SCENE } from '../const/const'
import Button from '../components/Button'

export default class GameOverScene extends Phaser.Scene {
    private playAgainBtn: Button
    private homeBtn: Button
    private score: number

    public constructor() {
        super({
            key: SCENE.GAMEOVER,
        })
    }

    public init(data: { score: number })
    {
        this.score = data.score
    }

    public preload(): void {
        //
    }

    public create(): void {
        /*const image = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        image.setTint(0x555555)*/
        this.add.rectangle(0, 0, 3200, 1600, 0x000000).setOrigin(0, 0).setAlpha(0.5)

        this.add.rectangle(2100, 100 + 100 / 2, 950, 1250, 0x8aa1c0).setOrigin(0.5, 0)
        this.add.rectangle(2100, 100 + 100 / 2, 930, 1240, 0x242c46).setOrigin(0.5, 0)

        this.add.rectangle(2100, 100 + 100 / 2, 1000, 100, 0x575f61)

        const text = this.add
            .text(2100, 100 + 100 / 2, 'RESULTS', {
                fontSize: '80px',
                fontFamily: FONT_NAME,
            })
            .setOrigin(0.5, 0.5)
        text.setStroke('#000000', 1)

        const text2 = this.add
            .text(2100, 275, 'DISTANCE', {
                fontSize: '80px',
                fontFamily: FONT_NAME,
            })
            .setOrigin(0.5, 0.5)
        text2.setStroke('#000000', 1)

        const text3 = this.add
            .text(2100, 400, `${Math.floor(this.score)}M`, {
                fontSize: '125px',
                fontFamily: FONT_NAME,
                color: '#fef03b'
            })
            .setOrigin(0.5, 0.5)
        text3.setStroke('#000000', 1)

        const text4 = this.add
            .text(2100 - 400, 600, 'COLLECTED', {
                fontSize: '60px',
                fontFamily: FONT_NAME
            })
            .setOrigin(0, 0.5)
        text4.setStroke('#000000', 1)

        const text5 = this.add
            .text(2450, 600, '96', {
                fontSize: '60px',
                fontFamily: FONT_NAME,
                color: '#fef03b'
            })
            .setOrigin(1, 0.5)
        text5.setStroke('#000000', 1)

        this.add.image(2500, 600, COIN).setDisplaySize(60, 60)

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
            this.scene.stop(SCENE.GAMEPLAY)
            this.scene.start(SCENE.MENU)
        }
        else if (this.playAgainBtn.getIsPointerDown())
        {
            this.scene.stop(SCENE.GAMEPLAY)
            this.scene.start(SCENE.GAMEPLAY)
        }
    }
}
