import Button from '../components/Button'
import { FONT_NAME, SCENE } from '../const/const'
import { DEPTH } from '../const/depth'
import Volume from '../object/Volume'

export default class SettingScene extends Phaser.Scene {
    private backBtn: Button
    private prevScene: SCENE

    private volumeValue: Phaser.GameObjects.Text

    private plusBtn: Button
    private minusBtn: Button

    public constructor() {
        super({
            key: SCENE.SETTING,
        })
    }

    public init(data: { scene: SCENE }) {
        this.prevScene = data.scene
    }

    public create(): void {
        this.add.rectangle(0, 0, 3200, 1600, 0x0000).setOrigin(0, 0).setAlpha(0.8)

        this.add.rectangle(1600, 200, 2800, 1200, 0x1f2944).setOrigin(0.5, 0)

        this.backBtn = new Button(this, 300, 100, 200, 80, 'BACK', {
            color: '#ffffff',
            fontSize: '40px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME,
        })
        this.backBtn.setInteractive()

        this.plusBtn = new Button(this, 2000, 800, 230, 230, '+', {
            color: '#ffffff',
            fontSize: '130px',
            fontStyle: 'bold',
        })
        this.plusBtn.setInteractive()

        this.minusBtn = new Button(this, 1200, 800, 230, 230, '-', {
            color: '#ffffff',
            fontSize: '130px',
            fontStyle: 'bold',
        })
        this.minusBtn.setInteractive()

        this.volumeValue = this.add
            .text(1600, 800, String(Math.ceil(Volume.value * 100)), {
                fontSize: '130px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
            })
            .setDepth(DEPTH.OBJECT_MEDIUM)
            .setOrigin(0.5, 0.5)
    }

    public update(): void {
        if (this.backBtn.getIsPointerDown()) {
            this.scene.stop(SCENE.SETTING)
            this.scene.resume(this.prevScene)
        } else if (this.plusBtn.getIsPointerDown()) {
            Volume.value += 0.005
            if (Volume.value >= 1) Volume.value = 1
            this.volumeValue.setText(String(Math.ceil(Volume.value * 100)))
        } else if (this.minusBtn.getIsPointerDown()) {
            Volume.value -= 0.005
            if (Volume.value <= 0) Volume.value = 0
            this.volumeValue.setText(String(Math.ceil(Volume.value * 100)))
        }
    }
}
