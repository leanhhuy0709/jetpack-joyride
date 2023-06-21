import * as Phaser from 'phaser'
import {
    BARRY_SPRITE_SHEET,
    BULLET,
    CACTUS,
    EXPLOSION,
    SCENE,
    ZAP_1,
    ZAP_SPRITE_BOT,
    ZAP_SPRITE_TOP,
} from '../const/const'
import Player from '../object/Player'
import Obstacle from '../object/Obstacle'
import ObstacleManager from '../object/ObstacleManager'
import Score from '../Score'

export default class GamePlayScene extends Phaser.Scene {
    private player: Player
    private platforms: Phaser.Physics.Arcade.StaticGroup
    private obstacle: Obstacle
    private obstacleManager: ObstacleManager
    private score: Score

    private cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }

    public constructor() {
        super(SCENE.GAMEPLAY)
    }

    public preload(): void {
        // Load game assets
        console.log('Load game assets')
        this.load.spritesheet('barry', BARRY_SPRITE_SHEET, {
            frameWidth: 93,
            frameHeight: 95,
        })
        this.load.image('cactus', CACTUS)
        this.load.image('zap', ZAP_1)
        this.load.image('ground', 'assets/platform.png')
        this.load.image('bullet', BULLET)
        this.load.image('explosion', EXPLOSION)

        this.load.spritesheet('zapbot', ZAP_SPRITE_BOT, { frameWidth: 75, frameHeight: 58 })
        this.load.spritesheet('zaptop', ZAP_SPRITE_TOP, { frameWidth: 75, frameHeight: 58 })
    }

    public create(): void {
        // Initialize game objects
        console.log('Initialize game objects')

        this.platforms = this.physics.add.staticGroup()

        this.player = new Player(this, 800, 240, 'barry', this.platforms)

        const ground = this.platforms.create(1600, 1500, 'ground')
        ground.setSize(3200, 100)
        ground.setDisplaySize(3200, 100)

        this.obstacleManager = new ObstacleManager(this, 10, 'zap')

        this.physics.world.gravity.y = 1250

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player, this.platforms)

        this.score = new Score(this, 0, 0)

        const a = this.add.sprite(500, 1000, 'zapbot').setDisplaySize(75 * 2, 58 * 2)

        this.anims.create({
            key: 'turn-bot',
            frames: this.anims.generateFrameNumbers('zapbot', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        })
        a.setRotation(Math.PI/2)
        a.play('turn-bot')

        const b = this.add.sprite(500, 600, 'zaptop').setDisplaySize(75 * 2, 58 * 2)

        this.anims.create({
            key: 'turn-top',
            frames: this.anims.generateFrameNumbers('zaptop', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        })
        b.play('turn-top')
    }

    public update(_time: number, delta: number): void {
        // Update game objects

        this.player.update(delta)

        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }

        this.obstacleManager.update(delta)

        if (this.obstacleManager.checkCollider(this.player)) {
            console.log('You die!')
            this.score.resetScore()
        }

        this.score.add(delta, 0.1)
    }
}
