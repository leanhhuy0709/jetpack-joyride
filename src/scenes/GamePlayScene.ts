import * as Phaser from 'phaser'
import { PLAYER_1, SCENE } from '../const/const'
import Player from '../object/Player'

export default class GamePlayScene extends Phaser.Scene {
    platforms: Phaser.Physics.Arcade.StaticGroup
    cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }

    private player: Player

    stars: Phaser.Physics.Arcade.Group

    public constructor() {
        super(SCENE.GAMEPLAY)
        this.player = new Player(this, 100, 300, 32, 48, 'dude', PLAYER_1)
    }

    public preload(): void {
        // Load game assets
        console.log('Load game assets')
        this.load.image('sky', 'assets/cloud.png')
        this.load.image('ground', 'assets/platform.png')

        this.player.preload()
    }

    public create(): void {
        // Initialize game objects
        console.log('Initialize game objects')
        this.cameras.main.setBounds(0, 0, Infinity, Infinity);
        this.add.image(400, 300, 'sky').setDisplaySize(10000, 400)

        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(400, 368, 'ground').setScale(2).refreshBody()

        this.player.create()

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        })

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player.getObj(), this.platforms)
    }

    public update(time: number, delta: number): void {
        if (this.cursors.left.isDown) {
            this.player.getObj().setVelocityX(-160)

            this.player.getObj().anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.getObj().setVelocityX(160)

            this.player.getObj().anims.play('right', true)
        } else {
            this.player.getObj().setVelocityX(0)

            this.player.getObj().anims.play('turn')
        }

        if (this.cursors.up.isDown && this.player.getObj().body.touching.down) {
            this.player.getObj().setVelocityY(-330)
        }

        if (this.cursors.up.isDown && this.player.getObj().body.touching.down) {
            this.player.getObj().setVelocityY(-330)
        }
    }
}
