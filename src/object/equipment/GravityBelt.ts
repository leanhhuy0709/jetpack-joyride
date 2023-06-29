import { SPRITE } from '../../const/const'
import { DEPTH } from '../../const/depth'
import Player, { DEFAULT_JUMP_VELO, PLAYER_STATE } from '../Player'
import Equipment from './Equipment'

export default class GravityBelt extends Equipment {
    private gravity_effect: Phaser.GameObjects.Sprite

    public constructor(player: Player) {
        super(player)

        this.gravity_effect = this.player.scene.add
            .sprite(1000, 1000, SPRITE.ROCKET_EFFECT, 5)
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setScale(3.5)
            .setAngle(-90)
            .setVisible(false)

        if (!this.player.scene.anims.exists('gravity_effect')) {
            this.player.scene.anims.create({
                key: 'gravity_effect',
                frames: this.gravity_effect.anims.generateFrameNumbers(SPRITE.ROCKET_EFFECT, {
                    start: 4,
                    end: 7,
                }),
                frameRate: 10,
                repeat: -1,
            })
        }
        this.gravity_effect.play('gravity_effect')
    }

    public init() {
        this.player.scene.matter.world.setGravity(0, 0.95 * 2)
        this.player.setJumpVelo(DEFAULT_JUMP_VELO * 1.5)
    }

    public update(_delta: number): void {
        this.gravity_effect.setPosition(this.player.x - 10, this.player.y + 20)

        if (this.player.state != PLAYER_STATE.FALLING) this.gravity_effect.setVisible(false)
        else this.gravity_effect.setVisible(true)
    }

    public remove() {
        this.player.scene.matter.world.setGravity(0, 0.95)
        this.player.setJumpVelo(DEFAULT_JUMP_VELO)
    }
}
