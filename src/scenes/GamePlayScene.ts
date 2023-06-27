import * as Phaser from 'phaser'
import { IMAGE, SCENE, SPRITE } from '../const/const'
import Player from '../object/Player'
import Score from '../Score'
import Background from '../object/Background'
import ObjectPool from '../object/ObjectPool'
import CoinManager from '../object/coin/CoinManager'
import Obstacle from '../object/obstacle/Obstacle'
import ObstacleManager from '../object/obstacle/ObstacleManager'
import { DEPTH } from '../const/depth'

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
    private coinManager: CoinManager

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
        this.background = new Background(this, IMAGE.MID_ROOM)
        const midRoom = this.add
            .image(1655, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        const midRoom2 = this.add
            .image(1655 + (2021 * 1600) / 1200, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        const midRoom3 = this.add
            .image(1655 + (2021 * 1600) / 1200, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        this.background.setImage(midRoom, midRoom2, midRoom3)
        this.background.setWidth((2021 * 1600) / 1200)

        this.add
            .image(0, 0, IMAGE.START_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 1749, 1200)
            .setDisplaySize((1749 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_VERYHIGH)

        this.add.image(1000, 200, IMAGE.ALARM_LIGHT).setDepth(DEPTH.BACKGROUND_VERYHIGH)

        ObjectPool.init(this)
        this.matter.world.setBounds(0, 0, 1000, 1600, 64, false, false, true, true)
        this.matter.world.enabled = true

        this.ground = this.matter.add.rectangle(0, 1500, 1e9, 250, { isStatic: true })

        this.matter.world.add(this.ground)

        this.player = new Player(this, 800, 240, SPRITE.BARRY_SPRITE_SHEET)

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.obstacleManager = new ObstacleManager(this, 4)

        this.score = new Score(this)

        this.coinManager = new CoinManager(this, 4)
    }

    public update(_time: number, delta: number): void {
        this.cameras.main.scrollX = Number(this.player.x) - 800
        //console.log(this.player.x)

        //console.log(this.player)

        //console.log(this.cameras.main.scrollX - this.player.x)
        // Update game objects
        //console.log(Math.round((1000 / delta)))
        //const st = Date.now()

        this.background.update()
        this.player.update(delta)

        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }

        this.obstacleManager.update(delta)

        this.score.add(delta, this.player.getSpeed() / 10)

        if (this.obstacleManager.checkCollider(this.player)) {
            console.log('You die!')
            this.score.saveHighScore()
            this.coinManager.saveCoin()
            this.scene.pause()
            this.scene.launch(SCENE.GAMEOVER, {
                score: this.score.getScore(),
                coin: this.coinManager.getCoin(),
            })
        }

        this.coinManager.handleColliderWithPlayer(this.player)
        this.coinManager.setNewCoin()

        if (this.score.getScore() > this.score.getLevel()) {
            this.score.setLevel(this.score.getLevel() + 1000)
            this.player.setSpeed(this.player.getSpeed() + 0.1)
        }

        this.coinManager.update(delta, this.player.getSpeed())
        //const ed = Date.now()
        //console.log(ed - st)
    }
}
