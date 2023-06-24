import { COIN_PATTERN } from "../const/const"
import Coin from "./Coin"

export default class CoinManager {
    private coins: Coin[]
    private scene: Phaser.Scene
    private numCoin: number

    public constructor(scene: Phaser.Scene, numCoin: number) {
        this.scene = scene
        this.numCoin = numCoin
        this.coins = []

        let tmp = 1000
        for (let i = 0; i < this.numCoin; i++) {
            this.coins.push(new Coin(scene, tmp, Phaser.Math.Between(400, 800), Phaser.Math.Between(0, COIN_PATTERN.length - 1)))
            tmp += 2000
        }
    }

    public update(delta: number, playerSpeed: number) 
    {
        for (let i = 0; i < this.coins.length; i++)
        {
            this.coins[i].update(delta, playerSpeed)
        }
    }
}