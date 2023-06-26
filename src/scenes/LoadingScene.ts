import * as Phaser from 'phaser'
import {
    BARRY_BODY,
    BARRY_HEAD,
    BARRY_SPRITE_SHEET,
    BG1,
    BULLET,
    BULLET_FLASH,
    BUTTON_BACKING,
    COIN,
    COIN_COLLECT_1,
    COIN_COLLECT_2,
    COIN_COLLECT_3,
    COIN_PATTERN,
    COIN_SPRITE,
    EXPLOSION,
    GLOW,
    ORB_ANIM,
    SCENE,
    TITLE,
    TITLE_GLOW,
    ZAP_EFFECT,
} from '../const/const'
import { DEPTH } from '../const/depth'
import { BACKGROUND } from '../const/background_const'

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
        this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loading-bg')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        this.load.on('progress', (value: number) => {
            this.progressBar.clear()
            this.progressBar.fillStyle(0xb0bef7, 1)
            this.progressBar.fillRoundedRect(750, 1250, 1600 * value, 50, 20)
            this.progressBar.lineStyle(5, 0x0000)
            this.progressBar.strokeRoundedRect(750, 1250, 1600, 50, 20)
        })

        // Load game assets
        console.log('Load game assets')
        this.load.image('logo', 'assets/images/JetpackJoyride.webp')
        this.load.image('bg', 'assets/images/2.png')
        // Load game assets
        console.log('Load game assets')
        this.load.spritesheet(BARRY_SPRITE_SHEET, BARRY_SPRITE_SHEET, {
            frameWidth: 93,
            frameHeight: 95,
        })

        this.load.spritesheet(BARRY_BODY, BARRY_BODY, {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet(BARRY_HEAD, BARRY_HEAD, {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.image(BULLET, BULLET)
        this.load.spritesheet(EXPLOSION, EXPLOSION, {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.spritesheet(ORB_ANIM, ORB_ANIM, { frameWidth: 62, frameHeight: 42 })
        this.load.image(COIN, COIN)
        this.load.image(BG1, BG1)

        this.load.spritesheet(GLOW, GLOW, {
            frameWidth: 128,
            frameHeight: 128,
        })

        this.load.spritesheet(ZAP_EFFECT, ZAP_EFFECT, {
            frameWidth: 1024 / 4,
            frameHeight: 117,
        })

        this.load.spritesheet(BULLET_FLASH, BULLET_FLASH, {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.image(TITLE, TITLE)
        this.load.image(TITLE_GLOW, TITLE_GLOW)

        this.load.spritesheet(COIN_SPRITE, COIN_SPRITE, {
            frameWidth: 32,
            frameHeight: 32,
        })

        for (let i = 0; i < COIN_PATTERN.length; i++) {
            this.load.text(`pattern${i}`, COIN_PATTERN[i])
        }

        this.load.audio(COIN_COLLECT_1, COIN_COLLECT_1)
        this.load.audio(COIN_COLLECT_2, COIN_COLLECT_2)
        this.load.audio(COIN_COLLECT_3, COIN_COLLECT_3)

        this.load.image(BUTTON_BACKING, BUTTON_BACKING)

        this.load.image(BACKGROUND.START_ROOM_1, BACKGROUND.START_ROOM_1)
        this.load.image(BACKGROUND.START_ROOM_2, BACKGROUND.START_ROOM_2)
        this.load.image(BACKGROUND.START_ROOM, BACKGROUND.START_ROOM)
        this.load.image(BACKGROUND.MID_ROOM, BACKGROUND.MID_ROOM)
        this.load.image(BACKGROUND.AQUA_ROOM, BACKGROUND.AQUA_ROOM)
    }

    public create(): void {
        //console.log('Initialize game objects')
    }

    public update(): void {
        this.scene.start(SCENE.GAMEPLAY)
    }
}
