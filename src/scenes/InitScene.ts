import * as Phaser from 'phaser'
import { LOGO2 } from '../const/const'

export default class InitScene extends Phaser.Scene {
    private progressBar: Phaser.GameObjects.Graphics
    private progressText: Phaser.GameObjects.Text

    public constructor() {
        super('InitScene')
    }

    public preload(): void {
        this.load.image('loading-bg', LOGO2)
    }

    public create(): void {
        //
    }

    public update(): void {
        this.scene.start('LoadingScene')
    }
}
