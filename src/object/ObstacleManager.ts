import ObjectPool from './ObjectPool'
import Obstacle from './Obstacle'
import Player from './Player'
import Zap from './Zap'

export default class ObstacleManager {
    private obstacles: Obstacle[]
    private scene: Phaser.Scene
    private numObstacle: number

    public constructor(scene: Phaser.Scene, numObstacle: number) {
        this.scene = scene
        this.numObstacle = numObstacle
        this.obstacles = []

        let tmp = 3000
        for (let i = 0; i < numObstacle; i++) {
            this.obstacles.push(ObjectPool.getZap(scene, 1300, 1300, 1750, 500))
            this.obstacles[i].reset(tmp)
            tmp = (this.obstacles[i] as Zap).maxX() + 1000
        }
    }

    public checkCollider(player: Player): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.scene.matter.overlap(player, this.obstacles[i].getBody())) {
                return true
            }
            if (this.obstacles[i].minX() > player.x + player.width / 2) break
        }
        return false
    }

    public update(delta: number, playerSpeed: number): void {
        let countRemoveObstacle = 0

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update(delta, playerSpeed)
        }

        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].maxX() + 75 < this.scene.cameras.main.scrollX) {
                ObjectPool.removeObstacle(this.obstacles[i])
                countRemoveObstacle++
            } else break
        }
        if (countRemoveObstacle) this.obstacles.splice(0, countRemoveObstacle)

        let currentMaxX = 0
        if (this.obstacles.length) currentMaxX = this.obstacles[this.obstacles.length - 1].maxX()

        while (this.obstacles.length < this.numObstacle) {
            const zap = ObjectPool.getZap(this.scene, 0, 0, 0, 0)
            zap.reset(currentMaxX + Phaser.Math.Between(800, 1200))
            currentMaxX = zap.maxX()
            this.obstacles.push(zap)
        }
    }
}
