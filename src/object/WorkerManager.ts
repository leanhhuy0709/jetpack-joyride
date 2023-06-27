import ObjectPool from './ObjectPool'
import Player from './Player'
import Worker from './Worker'

export default class WorkerManager {
    private scene: Phaser.Scene
    private workers: Worker[]

    public constructor(scene: Phaser.Scene, numWorker: number) {
        this.scene = scene
        this.workers = []
        let tmp = 4000
        for (let i = 0; i < numWorker; i++) {
            this.workers.push(ObjectPool.getWorker(scene, tmp, 1200))
            tmp += Phaser.Math.Between(100, 1000)
        }
    }

    public update(delta: number, player: Player): void {
        let numWorkerRemoved = 0
        for (let i = 0; i < this.workers.length; i++) {
            this.workers[i].update(delta, player)
            if (this.workers[i].getMaxX() < this.scene.cameras.main.scrollX) {
                ObjectPool.removeWorker(this.workers[i])
                this.workers.splice(i, 1)
                i--
                numWorkerRemoved++
            }
        }
        for (let i = 0; i < numWorkerRemoved; i++)
        {
            this.workers.push(
                ObjectPool.getWorker(
                    this.scene,
                    this.workers[this.workers.length - 1].getMaxX() +
                        Phaser.Math.Between(100, 1000),
                    1200
                )
            )
        }
    }

    public handleCollider(player: Player): void {
        for (let i = 0; i < this.workers.length; i++) {
            this.workers[i].handleCollider(player)
        }
    }
}
