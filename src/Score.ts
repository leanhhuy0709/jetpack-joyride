export default class Score extends Phaser.GameObjects.Text {
    private score: number
    private highScore: number
    private highScoreText: Phaser.GameObjects.Text

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        super(scene, x, y, '0', {})

        this.scene.add.existing(this)

        this.setFontSize('100px')
        this.setColor('#000000')
        this.setFontFamily('Cambria')

        this.highScoreText = this.scene.add.text(2000, 0, '0')
        this.highScoreText.setFontSize('100px')
        this.highScoreText.setAlign('right')
        this.highScoreText.setColor('#000000')
        this.highScoreText.setFontFamily('Cambria')

        this.score = 0
        if (localStorage.getItem('highscore')) 
            this.highScore = Number(localStorage.getItem('highscore'))
        else this.highScore = 0
    }

    public add(delta: number, coeff = 1): void {
        this.score += delta * coeff
        
        
        if (this.highScore < this.score)
        {
            localStorage.setItem('highscore', `${Math.floor(this.score)}`)
            this.highScore = this.score
        }

        this.setNewScore()
    }

    public setNewScore(): void 
    {
        this.setText(`${Math.floor(this.score)}`)
        this.highScoreText.setText(`HI: ${Math.floor(this.highScore)}`)
    }
    
    public resetScore(): void {
        this.score = 0
        this.setNewScore()
    }
}
