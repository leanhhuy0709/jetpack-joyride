import Player, { DEFAULT_JUMP_VELO, PLAYER_STATE } from '../Player'
import Equipment from './Equipment'

export default class GravitySuit extends Equipment {
    private count = 0
    private flyFlag: boolean

    public constructor(player: Player) {
        super(player)
        this.flyFlag = false
    }

    public init() {
        this.player.canFireBullet = false
    }

    public update(_delta: number): void {
        //
    }

    public remove() {
        this.player.scene.matter.world.setGravity(0, 0.95)
        this.player.setJumpVelo(DEFAULT_JUMP_VELO)
    }

    public flying(): void {
        this.flyFlag = true
    }

    public falling(): void {
        if (this.flyFlag) {
            this.count++
            const gravity = this.player.scene.matter.world.localWorld.gravity.y

            this.player.scene.matter.world.setGravity(0, -gravity)

            if (-gravity > 0) this.player.setFlipY(false)
            else this.player.setFlipY(true)
            this.player.setJumpVelo(0)
            this.flyFlag = false

            this.player.state = PLAYER_STATE.FALLING
            this.player.play('fall')
        }
    }
}
