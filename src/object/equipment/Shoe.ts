import Player from '../Player'
import Equipment from './Equipment'

export default class Shoe extends Equipment {
    public constructor(player: Player) {
        super(player)
    }

    public init() {
        this.player.setDefaultSpeed(1)
    }

    public remove() {
        this.player.setDefaultSpeed(0.5)
    }
}
