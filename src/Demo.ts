import * as Phaser from 'phaser'

class MyScene extends Phaser.Scene {
    platforms: Phaser.Physics.Arcade.StaticGroup
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }

    stars: Phaser.Physics.Arcade.Group

    public constructor() {
        super('MyScene')
    }

    public preload(): void {
        // Load game assets
        console.log('Load game assets')
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
    }

    public create(): void {
        // Initialize game objects
        console.log('Initialize game objects')
        this.add.image(400, 300, 'sky')

        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')

        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

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

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        })

        this.stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
            if (child instanceof Phaser.Physics.Arcade.Sprite) {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
            }
            return null
        })

        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.stars, this.platforms)

        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this)

        this.scene.bringToTop('dude')
    }

    public update(): void {
        // Update game logic
        //console.log('Update game logic')

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
        }
    }

    public collectStar(
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        star: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        const starWithBody = star as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        starWithBody.disableBody(true, true)
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scene: [MyScene],
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true,
        },
    },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Phaser.Game(config)