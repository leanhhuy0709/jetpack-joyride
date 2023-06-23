import Coin from "./Coin"

export default class CoinManager {
    private coins: Coin[]
    private scene: Phaser.Scene
    private numCoin: number

    public constructor(scene: Phaser.Scene, numCoin: number) {
        this.scene = scene
        this.numCoin = numCoin
        this.coins = []
    }
}