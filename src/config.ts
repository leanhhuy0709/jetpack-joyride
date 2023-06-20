export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Jetpack Joyride',
  url: 'https://github.com/leanhhuy0709/jetpack-joyride',
  version: '2.0',
  width: 390,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  backgroundColor: '#98d687',
  render: { pixelArt: true, antialias: false }
}
