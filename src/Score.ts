import { FONT_NAME } from './const/const'

export default class Score extends Phaser.GameObjects.Text {
    private score: number
    private highScore: number
    private highScoreText: Phaser.GameObjects.Text
    private level: number

    public constructor(scene: Phaser.Scene) {
        super(scene, 0, 60, '0', {})

        this.scene.add.existing(this)

        this.setFontSize('80px')
        this.setColor('#ffffff')
        this.setFontFamily(FONT_NAME)
        this.setStroke('#000000', 5)

        this.highScoreText = this.scene.add.text(0, 150, '0')
        this.highScoreText.setFontSize('80px')
        this.highScoreText.setAlign('right')
        this.highScoreText.setColor('#ffffff')
        this.highScoreText.setFontFamily(FONT_NAME)
        this.highScoreText.setStroke('#000000', 5)

        this.score = 0
        if (localStorage.getItem('highscore'))
            this.highScore = Number(localStorage.getItem('highscore'))
        else this.highScore = 0
        this.level = 100
    }

    public add(delta: number, coeff = 1): void {
        this.score += delta * coeff

        if (this.highScore < this.score) {
            
            this.highScore = this.score
        }
        
        this.setNewScore()
    }

    public setNewScore(): void {
        this.setText(`${Math.floor(this.score)}m`)
        this.highScoreText.setText(`Best: ${Math.floor(this.highScore)}m`)
    }

    public resetScore(): void {
        this.score = 0
        this.setNewScore()
    }

    public getLevel(): number {
        return this.level
    }

    public setLevel(level: number): void {
        this.level = level
    }

    public getScore(): number{
        return this.score
    }

    public saveHighScore(): void {
        localStorage.setItem('highscore', `${this.highScore}`)
    }
}
