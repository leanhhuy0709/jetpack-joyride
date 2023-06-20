import 'phaser'

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        this.load.image('background', 'assets/phaser-logo.png')
        //this.load.image('player', 'assets/player.png')
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0)
        //this.add.image(400, 300, 'player')
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Phaser.Game(config)
