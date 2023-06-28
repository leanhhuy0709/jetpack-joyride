import * as Phaser from 'phaser'
import { IMAGE, SCENE, SPRITE } from '../const/const'
import Player from '../object/Player'
import Score from '../Score'
import Background from '../object/Background'
import ObjectPool from '../object/ObjectPool'
import CoinManager from '../object/coin/CoinManager'
import ObstacleManager, { DEFAULT_SAFE_DISTACE } from '../object/obstacle/ObstacleManager'
import { DEPTH } from '../const/depth'
import RocketManager from '../object/obstacle/RocketManager'
import WorkerManager from '../object/WorkerManager'
import StartBackground from '../object/background/StartBackground'

export default class GamePlayScene extends Phaser.Scene {
    private player: Player
    private obstacleManager: ObstacleManager
    private score: Score
    private background: Background
    public ground: MatterJS.BodyType
    private cursors: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        up: Phaser.Input.Keyboard.Key
        down?: Phaser.Input.Keyboard.Key
        space?: Phaser.Input.Keyboard.Key
        shift?: Phaser.Input.Keyboard.Key
    }
    private coinManager: CoinManager
    private rocketManager: RocketManager
    private workerManager: WorkerManager

    private usingKey: boolean
    private usingTouch: boolean

    public constructor() {
        super({
            key: SCENE.GAMEPLAY,
        })
    }

    public preload(): void {
        //
    }

    public create(): void {
        // Initialize game objects
        this.background = new Background(this, IMAGE.MID_ROOM)
        const midRoom = this.add
            .image(1655, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        const midRoom2 = this.add
            .image(1655 + (2021 * 1600) / 1200, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        const midRoom3 = this.add
            .image(1655 + (2021 * 1600) / 1200, 0, IMAGE.MID_ROOM)
            .setOrigin(0, 200 / 1600)
            .setCrop(0, 200, 2021, 1200)
            .setDisplaySize((2021 * 1600) / 1200, (1600 * 1600) / 1200)
            .setDepth(DEPTH.BACKGROUND_MEDIUM)

        this.background.setImage(midRoom, midRoom2, midRoom3)
        this.background.setWidth((2021 * 1600) / 1200)

        new StartBackground(this, 0, true)

        this.cameras.main.shake(400, new Phaser.Math.Vector2(0.01, 0.01))

        for (let i = 0; i < 1000; i++) {
            const scale = Phaser.Math.Between(1, 15)
            const end = Phaser.Math.Between(2000, 2400)
            const randomOffset = Phaser.Math.Between(-400, -100)
            const randomCoef = Phaser.Math.Between(5, 15)
            const x = Phaser.Math.Between(-300, 300)
            const smokeImage = this.add
                .image(x, this.evaluateSmokeYPosition(x, randomOffset, randomCoef), IMAGE.SMOKE)
                .setDepth(DEPTH.OBJECT_VERYHIGH)
                .setScale(scale)
                .setAlpha(Math.random())
                .setAngle(Phaser.Math.Between(0, 360))

            this.tweens.add({
                targets: smokeImage,
                x: end,
                alpha: 0,
                duration: Phaser.Math.Between(2000, 4000),
                delay: Phaser.Math.Between(0, 100),
                ease: 'Power2',
                onComplete: () => {
                    smokeImage.destroy()
                },
                onUpdate: () => {
                    smokeImage.y = this.evaluateSmokeYPosition(
                        smokeImage.x,
                        randomOffset,
                        randomCoef
                    )
                    smokeImage.setScale(((end - smokeImage.x) / end) * scale)
                    if (smokeImage.x >= 800 && smokeImage.y > 1250) smokeImage.alpha = 0
                },
            })
        }
        const doNotTouch = this.add
            .image(370, 1300, IMAGE.DO_NOT_TOUCH)
            .setDepth(DEPTH.OBJECT_VERYHIGH)
            .setScale(1.7)

        this.tweens.add({
            targets: doNotTouch,
            x: 2300,
            duration: 2000,
            delay: Phaser.Math.Between(0, 100),
            onUpdate: () => {
                doNotTouch.y = this.evaluateSmokeYPosition(doNotTouch.x, -200, 6.5)
                doNotTouch.setAngle((doNotTouch.x / 2400) * 360 + 90)
            },
        })

        ObjectPool.init(this)
        this.matter.world.setBounds(0, 0, 1000, 1600, 64, false, false, true, true)
        this.matter.world.enabled = true

        this.ground = this.matter.add.rectangle(0, 1500, 1e9, 250, { isStatic: true })
        this.matter.world.add(this.ground)

        this.player = new Player(this, 800, 1250, SPRITE.BARRY_SPRITE_SHEET)
        this.player.setVisible(false)
        this.player.setSpeed(0)

        const barry = this.add
            .sprite(100, 1300.05, SPRITE.BARRY_SPRITE_SHEET)
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setDisplaySize(140, 160)
            .play('move')

        this.add.tween({
            targets: barry,
            x: 800,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.player.setSpeed(0.5)
                this.player.setVisible(true)
                barry.destroy()
            },
        })

        if (this.input.keyboard) this.cursors = this.input.keyboard.createCursorKeys()

        this.rocketManager = new RocketManager(this, 3)
        this.obstacleManager = new ObstacleManager(this, 4)
        this.coinManager = new CoinManager(this, 4)
        this.workerManager = new WorkerManager(this, 20)

        this.score = new Score(this)

        this.cameras.main.startFollow(this.player, undefined, undefined, 0, -800, 450)

        this.input.addPointer(1)
        this.usingKey = this.usingTouch = true
    }

    public update(_time: number, delta: number): void {
        this.background.update()
        this.player.update(delta)

        if (this.cursors.space?.isDown) {
            this.usingKey = true
            this.usingTouch = false
            if (this.usingKey && this.player.visible) this.player.flying()
        } else if (this.cursors.space?.isUp) {
            if (this.usingKey) this.player.falling()
        }

        if (this.input.pointer1.isDown) {
            this.usingKey = false
            this.usingTouch = true
            if (this.usingTouch && this.player.visible) this.player.flying()
        } else {
            if (this.usingTouch) this.player.falling()
        }

        this.workerManager.update(delta, this.player)
        this.workerManager.handleCollider(this.player)

        this.obstacleManager.update(delta)
        this.rocketManager.update(delta, this.player)

        this.score.add(delta, this.player.getSpeed() / 10)

        if (
            this.obstacleManager.checkCollider(this.player) ||
            this.rocketManager.checkCollider(this.player)
        ) {
            console.log('You die!')
            this.score.saveHighScore()
            this.coinManager.saveCoin()
            this.scene.pause()
            this.scene.launch(SCENE.GAMEOVER, {
                score: this.score.getScore(),
                coin: this.coinManager.getCoin(),
            })
        }

        this.coinManager.handleColliderWithPlayer(this.player)
        this.coinManager.setNewCoin()

        if (this.score.getScore() > this.score.getLevel()) {
            this.score.setLevel(this.score.getLevel() + 100)
            this.player.setSpeed(this.evaluateSpeed(this.score.getScore()))
            this.obstacleManager.setMinSafeDistance(
                DEFAULT_SAFE_DISTACE + this.score.getScore() / 1000
            )
        }

        this.coinManager.update(delta, this.player.getSpeed())
    }

    private evaluateSmokeYPosition(x: number, offset: number, coef: number): number {
        return coef * 0.5 * ((x - 1000) / 100) ** 2 + 1000 + offset
    }

    private evaluateSpeed(score: number): number {
        return Math.log10((0.5 * score) / 1000 + 1) + 0.5
    }
}
