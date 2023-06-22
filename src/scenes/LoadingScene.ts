import * as Phaser from 'phaser'
import { BARRY_SPRITE_SHEET, BG1, BULLET, CACTUS, COIN, EXPLOSION, SCENE, ZAP_SPRITE } from '../const/const'
import { DEPTH } from '../const/depth'

export default class LoadingScene extends Phaser.Scene {
    private progressBar: Phaser.GameObjects.Graphics
    private progressText: Phaser.GameObjects.Text

    public constructor() {
        super({
            key: SCENE.LOADING,
        })
    }

    public preload(): void {
        this.progressBar = this.add.graphics()
        this.progressBar.setDepth(DEPTH.BACKGROUND_HIGH)

        this.load.on('progress', (value: number) => {
            this.add
                .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loading-bg')
                .setDisplaySize(this.cameras.main.width, this.cameras.main.height)

            this.progressBar.clear()
            this.progressBar.fillStyle(0xB0BEF7, 1)
            this.progressBar.fillRoundedRect(750, 1250, 1600 * value, 50, 20)
            this.progressBar.lineStyle(5, 0x0000)
            this.progressBar.strokeRoundedRect(750, 1250, 1600 * value, 50, 20)
        })

        // Load game assets
        console.log('Load game assets')
        this.load.image('phaser', 'assets/images/phaser-logo.png')
        this.load.image('logo', 'assets/images/JetpackJoyride.webp')
        this.load.image('bg', 'assets/images/2.png')
        // Load game assets
        console.log('Load game assets')
        this.load.spritesheet('barry', BARRY_SPRITE_SHEET, {
            frameWidth: 93,
            frameHeight: 95,
        })
        this.load.image('cactus', CACTUS)
        this.load.image('ground', 'assets/platform.png')
        this.load.image('bullet', BULLET)
        this.load.image('explosion', EXPLOSION)

        this.load.spritesheet('zap', ZAP_SPRITE, { frameWidth: 75, frameHeight: 58 })
        this.load.image('light1', 'assets/zap/light1.webp')
        this.load.image('coin', COIN)
        this.load.image('bg1', BG1)
    }

    public create(): void {
        //console.log('Initialize game objects')
    }

    public update(): void {
        this.scene.start(SCENE.MENU)
    }
}
