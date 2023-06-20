import MenuScene from "./scenes/MenuScene"

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Jetpack Joyride',
    url: 'https://github.com/leanhhuy0709/jetpack-joyride',
    version: '1.0',
    type: Phaser.AUTO,
    parent: 'game',
    scene: [MenuScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        },
    },
    width: 800,
    height: 400,
    scale: {
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    backgroundColor: '#98d687',
    render: { pixelArt: true, antialias: false },
}
