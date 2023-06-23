import * as Phaser from 'phaser'
import { SCENE } from '../const/const'
import Player from '../object/Player'
import Obstacle from '../object/Obstacle'
import ObstacleManager from '../object/ObstacleManager'
import Score from '../Score'
import Background from '../object/Background'
import ObjectPool from '../object/ObjectPool'

let maxCount = 0
export default class GamePlayScene extends Phaser.Scene {
    private player: Player
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private obstacle: Obstacle
    private obstacleManager: ObstacleManager
    private score: Score
    private background: Background
    public ground: MatterJS.BodyType
    private cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }

    public constructor() {
        super({
            key: SCENE.GAMEPLAY,
        })
    }

    public preload(): void {
        //
    }

    public create(): void {
        // Initialize game objects
        //console.log('Initialize game objects')
        ObjectPool.clear()

        this.background = new Background(this, 'bg1')

        this.matter.world.setBounds(0, 0, 10000, 1600)
        this.matter.world.enabled = true

        this.ground = this.matter.add.rectangle(1600, 1500, 3200, 150, { isStatic: true })

        this.matter.world.add(this.ground)

        this.player = new Player(this, 800, 240, 'barry')

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.obstacleManager = new ObstacleManager(this, 4)

        this.score = new Score(this)
    }

    public update(_time: number, delta: number): void {
        // Update game objects
        ////console.log(Math.round(1000 / delta))
        ////console.log(ObjectPool.count)
        //console.log("------------------------------------")

        let st = Date.now()
        this.background.update(delta, this.player.getSpeed())
        let ed = Date.now()
        //console.log(`Background count time (ms): ${ed - st}`)

        st = Date.now()
        this.player.update(delta)
        ed = Date.now()
        //console.log(`Player count time (ms): ${ed - st}`)

        st = Date.now()
        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }
        ed = Date.now()
        //console.log(`Input count time (ms): ${ed - st}`)
        
        st = Date.now()
        this.obstacleManager.update(delta, this.player.getSpeed())
        ed = Date.now()
        maxCount = Math.max(ed - st, maxCount)
        //console.log(`Obstacle Manager count time (ms): ${ed - st}, ${maxCount}`)

        this.score.add(delta, this.player.getSpeed() / 10)
        st = Date.now()
        if (this.obstacleManager.checkCollider(this.player)) {
            //console.log('You die!')
            this.score.saveHighScore()
            this.scene.pause()
            this.scene.launch(SCENE.GAMEOVER, { score: this.score.getScore() })
        }
        ed = Date.now()
        //console.log(`Obstacle Manager count time (ms): ${ed - st}`)

        if (this.score.getScore() > this.score.getLevel()) {
            this.score.setLevel(this.score.getLevel() + 1000)
            this.player.setSpeed(this.player.getSpeed() + 0.1)
        }
    }
}
