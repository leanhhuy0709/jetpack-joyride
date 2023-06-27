import { SPRITE } from '../const/const'
import { DEPTH } from '../const/depth'
import Player from './Player'

enum WORKER_STATE {
    MOVE = 0,
    RUN = 1,
    DEAD = 2,
}

export default class Worker {
    protected scene: Phaser.Scene
    protected head: Phaser.Physics.Matter.Sprite
    protected body: Phaser.Physics.Matter.Sprite
    protected state: WORKER_STATE
    protected velocity: number
    protected headKey: string
    protected bodyKey: string
    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        headKey = SPRITE.WORKER_2_HEAD,
        bodyKey = SPRITE.WORKER_2_BODY
    ) {
        this.scene = scene

        this.body = this.scene.matter.add
            .sprite(x, y + 43, bodyKey, undefined)
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setScale(4)
            .setFixedRotation()
            .setCollisionGroup(-2)
        this.head = this.scene.matter.add
            .sprite(x, y, headKey, undefined)
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setScale(4)
            .setFixedRotation()
            .setCollisionGroup(-2)

        if (!this.scene.anims.exists(bodyKey + 'move'))
            this.scene.anims.create({
                key: bodyKey + 'move',
                frames: this.body.anims.generateFrameNumbers(bodyKey, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 10,
                repeat: -1,
            })

        if (!this.scene.anims.exists(headKey + 'move'))
            this.scene.anims.create({
                key: headKey + 'move',
                frames: this.head.anims.generateFrameNumbers(headKey, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 10,
                repeat: -1,
            })

        if (!this.scene.anims.exists(bodyKey + 'run'))
            this.scene.anims.create({
                key: bodyKey + 'run',
                frames: this.body.anims.generateFrameNumbers(bodyKey, {
                    start: 4,
                    end: 7,
                }),
                frameRate: 10,
                repeat: -1,
            })

        if (!this.scene.anims.exists(headKey + 'run'))
            this.scene.anims.create({
                key: headKey + 'run',
                frames: this.head.anims.generateFrameNumbers(headKey, {
                    start: 4,
                    end: 7,
                }),
                frameRate: 10,
                repeat: -1,
            })

        this.velocity = (Math.random() - 0.5) / 2

        this.state = WORKER_STATE.MOVE

        if (this.state == WORKER_STATE.MOVE) {
            this.head.play(headKey + 'move')
            this.body.play(bodyKey + 'move')
        } else if (this.state == WORKER_STATE.RUN) {
            this.head.play(headKey + 'run')
            this.body.play(bodyKey + 'run')
        }

        this.headKey = headKey
        this.bodyKey = bodyKey

        if (this.velocity < 0) {
            this.body.setFlipX(true)
            this.head.setFlipX(true)
        }
    }

    public update(delta: number, player: Player): void {
        
        if (this.state == WORKER_STATE.DEAD)
        {
            this.head.setTexture(this.headKey, 13)
            this.body.setTexture(this.bodyKey, 13)
            return
        }
        
        if (this.state == WORKER_STATE.MOVE) {
            if (this.head.anims.currentAnim?.key != this.headKey + 'move') {
                this.head.play(this.headKey + 'move')
                this.body.play(this.bodyKey + 'move')
            }
            this.body.x += this.velocity * delta
            
        } else if (this.state == WORKER_STATE.RUN) {
            if (this.head.anims.currentAnim?.key != this.headKey + 'run') {
                this.head.play(this.headKey + 'run')
                this.body.play(this.bodyKey + 'run')
            }
            this.body.x += this.velocity * delta * 1.5
        }
        this.head.x = this.body.x
            this.head.y = this.body.y - 43

        if (Math.abs(player.x - this.body.x) < 300) {
            this.state = WORKER_STATE.RUN
        }
    }

    public handleCollider(player: Player): void {

        if (this.state == WORKER_STATE.DEAD) return
        const bullets = player.getBullets()

        for (let i = 0; i < bullets.length; i++) {
            if (this.scene.matter.overlap(bullets[i], this.getBody())) {
                this.state = WORKER_STATE.DEAD
                break
            }
        }
    }

    public getBody(): Phaser.Types.Physics.Matter.MatterBody[] {
        return [this.head, this.body]
    }
}