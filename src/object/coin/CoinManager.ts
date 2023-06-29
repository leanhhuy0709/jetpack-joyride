import Coin from './Coin'
import ObjectPool from '../ObjectPool'
import Player from '../Player'

export default class CoinManager {
    private coins: Coin[]
    private scene: Phaser.Scene
    private numCoin: number

    public constructor(scene: Phaser.Scene, numCoin: number) {
        this.scene = scene
        this.numCoin = numCoin
        this.coins = []

        let tmp = 4000
        for (let i = 0; i < this.numCoin; i++) {
            this.coins.push(ObjectPool.getCoin(scene, tmp, Phaser.Math.Between(400, 800)))
            tmp = this.coins[i].getMaxX() + 700
        }
    }

    public update() {
        let numDel = 0
        for (let i = 0; i < this.coins.length; i++) {
            if (this.coins[i].getMaxX() < this.scene.cameras.main.scrollX) {
                ObjectPool.removeCoin(this.coins[i])
                this.coins.splice(i, 1)
                i--
                numDel++
            }
        }

        for (let i = 0; i < numDel; i++) {
            const coin = ObjectPool.getCoin(
                this.scene,
                this.coins[this.coins.length - 1].getMaxX() + 700,
                Phaser.Math.Between(400, 800)
            )
            this.coins.push(coin)
        }
    }

    public handleColliderWithPlayer(player: Player): void {
        //
    }
}
