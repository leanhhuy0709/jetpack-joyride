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
                numWorkerRemoved++
            }
        }
        if (numWorkerRemoved == this.workers.length) {
            for (let i = 0; i < numWorkerRemoved; i++) {
                ObjectPool.removeWorker(this.workers[i])
            }
            this.workers = []
            let tmp = this.scene.cameras.main.scrollX + 3200 + Phaser.Math.Between(100, 1000)
            for (let i = 0; i < numWorkerRemoved; i++) {
                this.workers.push(ObjectPool.getWorker(this.scene, tmp, 1200))
                tmp += Phaser.Math.Between(100, 1000)
            }
        }
    }

    public handleCollider(player: Player): void {
        for (let i = 0; i < this.workers.length; i++) {
            this.workers[i].handleCollider(player)
            
        }
    }

    public setNumWorker(num: number): void {
        if (this.workers.length > num) {
            for (let i = this.workers.length - 1; i >= num; i--) {
                ObjectPool.removeWorker(this.workers[i])
                this.workers.pop()
            }
        } else if (this.workers.length < num) {
            let tmp = this.scene.cameras.main.scrollX + 3200 + Phaser.Math.Between(100, 1000)
            for (let i = this.workers.length; i < num; i++) {
                this.workers.push(ObjectPool.getWorker(this.scene, tmp, 1200))
                tmp += Phaser.Math.Between(100, 1000)
            }
        }
    }
}
