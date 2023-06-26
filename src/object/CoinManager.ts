import { COIN_SPRITE, FONT_NAME } from '../const/const'
import Coin from './Coin'
import ObjectPool from './ObjectPool'
import Player from './Player'

export default class CoinManager {
    private coins: Coin[]
    private scene: Phaser.Scene
    private numCoin: number
    private coinInRound = 0
    private coinInRoundText: Phaser.GameObjects.Text
    private allCoin = 0
    private coinImage: Phaser.GameObjects.Image

    public constructor(scene: Phaser.Scene, numCoin: number) {
        this.scene = scene
        this.numCoin = numCoin
        this.coins = []

        let tmp = 1000
        for (let i = 0; i < this.numCoin; i++) {
            this.coins.push(ObjectPool.getCoin(scene, tmp, Phaser.Math.Between(400, 800)))
            tmp = this.coins[i].getMaxX() + 700
        }

        if (localStorage.getItem('allCoin')) this.allCoin = Number(localStorage.getItem('allCoin'))
        else this.allCoin = 0

        this.coinInRound = 0
        this.coinInRoundText = this.scene.add.text(100, 240, '0')
        this.coinInRoundText.setFontSize('70px')
        this.coinInRoundText.setAlign('right')
        this.coinInRoundText.setColor('#ffe599')
        this.coinInRoundText.setFontFamily(FONT_NAME)
        this.coinInRoundText.setStroke('#000000', 5)

        this.coinImage = this.scene.add
            .image(10, 250, COIN_SPRITE)
            .setOrigin(0, 0)
            .setDisplaySize(70, 70)
    }

    public update(delta: number, playerSpeed: number) {
        let numDel = 0
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].update(delta, playerSpeed)
            if (this.coins[i].getMaxX() < this.scene.cameras.main.scrollX)
            {
                ObjectPool.removeCoin(this.coins[i])
                this.coins.splice(i, 1)
                i--
                numDel++
            }
        }

        for (let i = 0; i < numDel; i++) {
            const coin = ObjectPool.getCoin(this.scene, this.coins[this.coins.length - 1].getMaxX(), Phaser.Math.Between(400, 800))
            this.coins.push(coin)
        }
    }

    public handleColliderWithPlayer(player: Player): void {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].handleColliderWithPlayer(player, this)
        }
    }

    public setNewCoin(): void {
        this.coinInRoundText.setText(`${this.coinInRound}`)
        this.coinInRoundText.x = this.scene.cameras.main.scrollX + 100
        this.coinImage.x = this.scene.cameras.main.scrollX
    }

    public resetCoint(): void {
        this.coinInRound = 0
    }

    public addCoin(coeff = 1): void {
        this.coinInRound += coeff
    }

    public saveCoin(): void {
        this.allCoin += this.coinInRound
        localStorage.setItem('allCoin', `${this.allCoin}`)
    }

    public getCoin(): number {
        return this.coinInRound
    }
}
