import { COIN_PATTERN, COIN_SPRITE } from '../const/const'

export default class Coin {
    private scene: Phaser.Scene
    private coin: Phaser.Physics.Matter.Sprite[]
    public constructor(scene: Phaser.Scene, x: number, y: number, coinPatternIdx = 1) {
        this.scene = scene
        if (coinPatternIdx >= COIN_PATTERN.length) coinPatternIdx = 0
        const coinPattern = this.scene.cache.text.get(`pattern${coinPatternIdx}`)
        let row = 0,
            col = 0
        const d = 60

        const temp = this.scene.add.sprite(-10, -10, COIN_SPRITE)
        if (!this.scene.anims.exists('turn'))
        this.scene.anims.create({
            key: 'turn',
            frames: temp.anims.generateFrameNumbers(COIN_SPRITE, { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        this.coin = []

        for (let i = 0; i < coinPattern.length; i++) {
            if (coinPattern[i] == '\n') {
                row++
                col = 0
                continue
            }
            if (coinPattern[i] == '1') {
                this.coin.push(
                    this.scene.matter.add
                        .sprite(x + col * d, y + row * d, COIN_SPRITE, 0, { isStatic: true })
                        .setDisplaySize(40, 40)
                        .play('turn')
                        .setCollisionGroup(-2)
                )
            }
            col++
        }
    }

    public update(delta: number, playerSpeed: number): void {
        for (let i = 0; i < this.coin.length; i++) {
            this.coin[i].x -= delta * playerSpeed
        }
    }
}
