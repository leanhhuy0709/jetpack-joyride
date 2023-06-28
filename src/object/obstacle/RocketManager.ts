import ObjectPool from '../ObjectPool'
import Player from '../Player'
import Rocket from './Rocket'

export default class RocketManager {
    private scene: Phaser.Scene
    private rockets: Rocket[]
    private rocketIdx: number[]

    public constructor(scene: Phaser.Scene, numIdx: number) {
        this.scene = scene
        this.rockets = []

        this.rocketIdx = []
        let tmp = Phaser.Math.Between(10000, 15000)
        for (let i = 0; i < numIdx; i++) {
            this.rocketIdx.push(tmp)
            tmp += Phaser.Math.Between(10000, 15000)
        }
    }

    public checkCollider(player: Player): boolean {
        for (let i = 0; i < this.rockets.length; i++) {
            if (this.scene.matter.overlap(player, this.rockets[i].getBody())) {
                return true
            }
        }
        return false
    }

    public update(delta: number, player: Player): void {
        if (this.rocketIdx[0] < this.scene.cameras.main.scrollX + 3200) {
            let numRocket = 0
            const chance = [0, 50, 20, 10, 10, 10]
            const random = Phaser.Math.Between(1, 100)
            let sum = 0
            for (let i = 0; i < chance.length; i++) {
                sum += chance[i]
                if (random <= sum) {
                    numRocket = i
                    break
                }
            }
            for (let i = 0; i < numRocket; i++) {
                const rocket = ObjectPool.getRocket(this.scene, 0, 0)
                rocket.reset(this.rocketIdx[0])
                rocket.startAlert()
                this.rockets.push(rocket)
            }
            this.rocketIdx.splice(0, 1)
            this.rocketIdx.push(
                this.rocketIdx[this.rocketIdx.length - 1] + Phaser.Math.Between(5000, 10000)
            )
        }

        let numCanRemove = 0

        for (let i = 0; i < this.rockets.length; i++) {
            this.rockets[i].update(delta, player)
            if (this.rockets[i].maxX() < this.scene.cameras.main.scrollX) {
                numCanRemove++
            }
        }

        if (numCanRemove == this.rockets.length) {
            for (let i = 0; i < this.rockets.length; i++) {
                ObjectPool.removeRocket(this.rockets[i])
            }
            this.rockets = []
        }
    }
}
