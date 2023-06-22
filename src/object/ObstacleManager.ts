import Obstacle from './Obstacle'
import Player from './Player'
import Zap from './Zap'

export default class ObstacleManager {
    private obstacles: Obstacle[]
    private scene: Phaser.Scene

    public constructor(scene: Phaser.Scene, numObstacle: number) {
        this.scene = scene
        this.obstacles = []
        
        let tmp = 2000
        for (let i = 0; i < numObstacle; i++) {
            this.obstacles.push(new Zap(scene, 1300, 1200, 1750, 500))
            this.obstacles[i].reset(tmp)
            tmp = (this.obstacles[i] as Zap).maxX() + 1000
        }
    }

    public checkCollider(player: Player): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.scene.matter.overlap(player, this.obstacles[i].getBody()))
            {
                return true
            }
        }
        return false
    }

    public update(delta: number): void {
        const listObstacleNeedToReset = []

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update(delta)
            
            if ((this.obstacles[i] as Zap).maxX() + 75 < 0) {
                listObstacleNeedToReset.push(i)
            }
        }

        

        let tmp = 0
        for (let i = 0; i < this.obstacles.length; i++)
            tmp = tmp > (this.obstacles[i] as Zap).maxX() ? tmp : (this.obstacles[i] as Zap).maxX()
        tmp += Math.floor(Math.random() * 750) + 750

        
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            this.obstacles[j].reset(tmp)
            tmp = Math.floor(Math.random() * 1000) + 200 + (this.obstacles[j] as Zap).maxX()            
        }
    }
}
