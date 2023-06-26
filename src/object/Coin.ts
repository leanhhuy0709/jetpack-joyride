import {
    COIN_COLLECT_1,
    COIN_COLLECT_2,
    COIN_COLLECT_3,
    COIN_PATTERN,
    COIN_SPRITE,
} from '../const/const'
import CoinManager from './CoinManager'
import Player from './Player'

export default class Coin {
    private scene: Phaser.Scene
    private coins: Phaser.Physics.Matter.Sprite[]
    private minX: number
    private maxX: number
    private minY: number
    private maxY: number
    private sound1: Phaser.Sound.BaseSound
    private sound2: Phaser.Sound.BaseSound
    private sound3: Phaser.Sound.BaseSound
    public constructor(scene: Phaser.Scene, x: number, y: number, coinPatternIdx = 1) {
        this.scene = scene
        if (coinPatternIdx >= COIN_PATTERN.length) coinPatternIdx = 0
        const coinPattern = this.scene.cache.text.get(`pattern${coinPatternIdx}`)
        let row = 0,
            col = 0
        const d = 70

        const temp = this.scene.add.sprite(-20, -20, COIN_SPRITE)
        if (!this.scene.anims.exists('turn'))
            this.scene.anims.create({
                key: 'turn',
                frames: temp.anims.generateFrameNumbers(COIN_SPRITE, { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1,
            })

        this.coins = []
        this.minX = x
        this.maxX = x
        this.minY = y
        this.maxY = y

        for (let i = 0; i < coinPattern.length; i++) {
            if (coinPattern[i] == '\n') {
                row++
                col = 0
                continue
            }
            if (coinPattern[i] == '1') {
                this.coins.push(
                    this.scene.matter.add
                        .sprite(x + col * d, y + row * d, COIN_SPRITE, 0, { isStatic: true })
                        .setDisplaySize(50, 50)
                        .play('turn')
                        .setCollisionGroup(-2)
                )
                this.minX = Math.min(this.minX, x + col * d)
                this.maxX = Math.max(this.maxX, x + col * d)
                this.minY = Math.min(this.minY, y + row * d)
                this.maxY = Math.max(this.maxY, y + row * d)
            }
            col++
        }

        this.sound1 = this.scene.sound.add(COIN_COLLECT_1).setVolume(0.5)
        this.sound2 = this.scene.sound.add(COIN_COLLECT_2).setVolume(0.5)
        this.sound3 = this.scene.sound.add(COIN_COLLECT_3).setVolume(0.5)

        this.sound1.stop()
        this.sound2.stop()
        this.sound3.stop()
    }

    public update(_delta: number, _playerSpeed: number): void {
        //for (let i = 0; i < this.coins.length; i++) {
        //this.coins[i].x -= delta * playerSpeed
        //}
        //this.minX -= delta * playerSpeed
        //this.maxX -= delta * playerSpeed
    }

    public handleColliderWithPlayer(player: Player, coinManager: CoinManager): void {
        /*const diff = 20
        if (
            player.x - player.width / 2 - diff > this.maxX + this.coins[0].width / 2 ||
            player.x + player.width / 2 + diff < this.minX - this.coins[0].width / 2 ||
            player.y - player.height / 2 + diff < this.minY - this.coins[0].height / 2 ||
            player.y + player.height / 2 - diff > this.maxY + this.coins[0].height / 2
        )
            return*/
        for (let i = 0; i < this.coins.length; i++) {
            if (this.scene.matter.overlap(player, [this.coins[i]])) {
                if (this.coins[i].visible) {
                    this.coins[i].setVisible(false)
                    coinManager.addCoin()

                    this.sound1.play()
                    //this.sound2.play()
                    //this.sound3.play()
                }
            }
        }
    }

    public getMinX(): number {
        return this.minX
    }

    public getMaxX(): number {
        return this.maxX
    }

    public getMinY(): number {
        return this.minY
    }

    public getMaxY(): number {
        return this.maxY
    }
}
