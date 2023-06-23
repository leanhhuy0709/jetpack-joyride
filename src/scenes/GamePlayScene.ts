import * as Phaser from 'phaser'
import { BARRY_SPRITE_SHEET, BG1, SCENE } from '../const/const'
import Player from '../object/Player'
import Obstacle from '../object/Obstacle'
import ObstacleManager from '../object/ObstacleManager'
import Score from '../Score'
import Background from '../object/Background'
import ObjectPool from '../object/ObjectPool'
import Coin from '../object/Coin'

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
    private coin: Coin//temporary

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
        ObjectPool.init(this)

        this.background = new Background(this, BG1)

        //this.add.image(0, 0, TITLE_1).setDisplaySize(928 * 1600/790, 1600).setOrigin(0, 0)
        //this.add.image(928 * 1600/790 + 100, 0, TITLE_2).setDisplaySize(319 * 1600/790, 1600).setOrigin(0, 0)

        this.matter.world.setBounds(0, 0, 10000, 1600)
        this.matter.world.enabled = true

        this.ground = this.matter.add.rectangle(1600, 1500, 3200, 150, { isStatic: true })

        this.matter.world.add(this.ground)

        this.player = new Player(this, 800, 240, BARRY_SPRITE_SHEET)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.obstacleManager = new ObstacleManager(this, 4)

        this.score = new Score(this)

        this.coin = new Coin(this, 1000, 500, 2)
    }

    public update(_time: number, delta: number): void {
        // Update game objects
        this.background.update(delta, this.player.getSpeed())
        this.player.update(delta)

        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }

        this.obstacleManager.update(delta, this.player.getSpeed())

        this.score.add(delta, this.player.getSpeed() / 10)

        if (this.obstacleManager.checkCollider(this.player)) {
            console.log('You die!')
            this.score.saveHighScore()
            this.scene.pause()
            this.scene.launch(SCENE.GAMEOVER, { score: this.score.getScore() })
        }

        if (this.score.getScore() > this.score.getLevel()) {
            this.score.setLevel(this.score.getLevel() + 1000)
            this.player.setSpeed(this.player.getSpeed() + 0.1)
        }

        this.coin.update(delta, this.player.getSpeed())
    }
}
