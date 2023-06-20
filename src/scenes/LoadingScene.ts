import * as Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {

    public constructor() {
        super('LoadingScene')
    }

    public preload(): void {
        // Load game assets
        console.log('Load game assets')
        this.load.image('phaser', 'assets/images/phaser-logo.png')

    }

    public create(): void {
        // Initialize game objects
        console.log('Initialize game objects')
        this.add.image(400, 300, 'phaser')
    }

    public update(): void {
        // Update game logic
        //console.log('Update game logic')
    }
}