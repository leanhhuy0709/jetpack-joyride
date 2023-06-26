import GameOverScene from './scenes/GameOverScene'
import GamePlayScene from './scenes/GamePlayScene'
import InitScene from './scenes/InitScene'
import LoadingScene from './scenes/LoadingScene'
import MenuScene from './scenes/MenuScene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Jetpack Joyride',
    url: 'https://github.com/leanhhuy0709/jetpack-joyride',
    version: '1.0',
    type: Phaser.AUTO,
    parent: 'game',
    scene: [InitScene, LoadingScene, MenuScene, GamePlayScene, GameOverScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.95,
            },
            debug: {
                showBody: true,
                showStaticBody: true,
                lineColor: 0xfc1200
            }
            
        },
    },

    width: 3200,
    height: 1600,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
        resizeInterval: 1,
    },
    backgroundColor: '#000000',
    render: { pixelArt: true, antialias: false },
}
/*
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        },
    },
*/
