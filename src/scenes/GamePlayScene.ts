import * as Phaser from 'phaser'
import { BARRY_SPRITE_SHEET, BULLET, CACTUS, SCENE } from '../const/const'
import Player from '../object/Player'
import Obstacle from '../object/Obstacle'
import ObstacleManager from '../object/ObstacleManager'

export default class GamePlayScene extends Phaser.Scene {
    private player: Player
    private platforms: Phaser.Physics.Arcade.StaticGroup
    private obstacle: Obstacle
    private obstacleManager: ObstacleManager
    private score: number
    private scoreText: Phaser.GameObjects.Text

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
        this.load.image('ground', 'assets/platform.png')
        this.load.image('bullet', BULLET)
    }

    public create(): void {
        // Initialize game objects
        console.log('Initialize game objects')

        

        this.platforms = this.physics.add.staticGroup()

        this.player = new Player(this, 800, 240, 'barry', this.platforms)

        const ground = this.platforms.create(1600, 1500, 'ground')

        //this.obstacle = new Obstacle(this, 800, 240, 'cactus')
        this.obstacleManager = new ObstacleManager(this, 10, 'cactus')

        ground.setSize(3200, 100)
        ground.setDisplaySize(3200, 100)
        //ground.setDisplaySize(3200, 100)

        this.physics.world.gravity.y = 1250

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player, this.platforms)
        for (let i = 0; i < this.player.getBullets().length; i++) {
            this.physics.add.collider(this.player.getBullets()[i], this.platforms)
        }

        this.score = 0 //delete me

        this.scoreText = this.add.text(100, 100, `${Math.floor(this.score)}`)
        this.scoreText.setFontSize('100px')
        this.scoreText.setColor('#000000')
    }

    public update(_time: number, delta: number): void {
        this.player.update(delta)
        // Update game objects
        if (this.cursors.space?.isDown) {
            this.player.flying()
        } else if (this.cursors.space?.isUp) {
            this.player.falling()
        }

        this.obstacleManager.update(delta)

        if (this.obstacleManager.checkCollider(this.player)) {
            console.log('You die!')
            this.score = 0
        }

        this.score += delta / 10
        this.scoreText.setText(`${Math.floor(this.score)}`)

        /*
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)

            this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)

            this.player.anims.play('right', true)
        } else {
            this.player.setVelocityX(0)

            this.player.anims.play('turn')
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }*/
    }
}
