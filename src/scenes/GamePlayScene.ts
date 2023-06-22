import * as Phaser from 'phaser'
import { SCENE } from '../const/const'
import Player from '../object/Player'
import Obstacle from '../object/Obstacle'
import ObstacleManager from '../object/ObstacleManager'
import Score from '../Score'
import Background from '../object/Background'

export default class GamePlayScene extends Phaser.Scene {
    private player: Player
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private obstacle: Obstacle
    private obstacleManager: ObstacleManager
    private score: Score
    private background: Background

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
        console.log('Initialize game objects')

        
        this.background = new Background(this, 'bg1')
        

        this.matter.world.setBounds(0, 0, 10000, 1600)
        this.matter.world.enabled = true

        const ground = this.matter.add.rectangle(1600, 1500, 3200, 150, { isStatic: true })

        this.matter.world.add(ground)

        this.player = new Player(this, 800, 240, 'barry')

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.obstacleManager = new ObstacleManager(this, 10)

        this.score = new Score(this)
    }

    public update(_time: number, delta: number): void {
        // Update game objects
        this.background.update(delta)
        this.player.update(delta)
        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }

        this.obstacleManager.update(delta)

        if (this.obstacleManager.checkCollider(this.player)) {
            console.log('You die!')
            this.scene.start(SCENE.GAMEOVER)
        }

        this.score.add(delta, 0.01)
    }
}
