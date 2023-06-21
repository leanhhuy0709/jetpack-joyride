import GamePlayScene from "./scenes/GamePlayScene"
import MenuScene from "./scenes/MenuScene"

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Jetpack Joyride',
    url: 'https://github.com/leanhhuy0709/jetpack-joyride',
    version: '1.0',
    type: Phaser.AUTO,
    parent: 'game',
    scene: [MenuScene, GamePlayScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        },
    },
    width: 3200,
    height: 1600,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
        resizeInterval: 1
    },
    backgroundColor: '#CAE1FF',
    render: { pixelArt: true, antialias: false }
}
