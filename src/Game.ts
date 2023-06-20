import * as Phaser from 'phaser'

class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene')
    }

    preload() {
        // Load game assets
        console.log('Load game assets')
    }

    create() {
        // Initialize game objects
        console.log('Initialize game objects')
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game')
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
        console.log(canvas)
        console.log(ctx)
    }

    update() {
        // Update game logic
        console.log('Update game logic')
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MyScene],
}

const game = new Phaser.Game(config)
