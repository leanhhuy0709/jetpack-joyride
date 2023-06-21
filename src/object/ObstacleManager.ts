import Obstacle from './Obstacle'
import Player from './Player'

export default class ObstacleManager {
    private obstacles: Obstacle[]
    private scene: Phaser.Scene

    public constructor(scene: Phaser.Scene, numObstacle: number, key: string) {
        this.scene = scene
        this.obstacles = []
        let tmp = 2000
        for (let i = 0; i < numObstacle; i++) {
            this.obstacles.push(new Obstacle(scene, 0, 0, key))
            tmp = Math.floor(Math.random() * 1000) + 200 + tmp
            const x = tmp
            const y = Math.floor(Math.random() * 2000)
            this.obstacles[i].reset(x, y)
            
        }
    }

    public checkCollider(player: Player): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.scene.physics.overlap(player, this.obstacles[i])) return true
        }
        return false
    }

    public update(delta: number): void {
        const listObstacleNeedToReset = []

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= delta * 0.5
            const body = this.obstacles[i].body
            if (body) {
                body.position.x -= delta * 0.5
            }

            if (this.obstacles[i].x < -this.obstacles[i].width) {
                listObstacleNeedToReset.push(i)
            }
        }

        let tmp = 0
        for (let i = 0; i < this.obstacles.length; i++)
            tmp = tmp > this.obstacles[i].x ? tmp : this.obstacles[i].x
        tmp += Math.floor(Math.random() * 500) + 200

        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            tmp = Math.floor(Math.random() * 1000) + 200 + tmp
            if (this.obstacles[j].x < -this.obstacles[j].width) {
                const x = tmp
                const y = Math.floor(Math.random() * 2000)
                this.obstacles[j].reset(x, y)
            }
        }
    }
}
