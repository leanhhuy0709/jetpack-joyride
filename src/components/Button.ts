import * as Phaser from 'phaser'

export default class Button {
    private rectangle: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text

    private isPointerDown: boolean
    private isPointerOver: boolean

    private rectColor: number

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width?: number | undefined,
        height?: number | undefined,
        fillColor = 0x0000,
        content = '',
        style?: Phaser.Types.GameObjects.Text.TextStyle | undefined
    ) {
        this.rectangle = scene.add.rectangle(x, y, width, height, fillColor)
        this.text = scene.add.text(x, y, content, style).setOrigin(0.5, 0.5).setStroke('#000000', 10)
        this.isPointerDown = false
        this.isPointerOver = false
        this.rectColor = fillColor

        this.rectangle.setInteractive()    
    }

    public setInteractive(): void 
    {
        this.rectangle.on('pointerdown', () => this.handlePointerDown(this))

        this.rectangle.on('pointerup', () => this.handlePointerUp(this))

        this.rectangle.on('pointerover', () => this.handlePointerOver(this))

        this.rectangle.on('pointerout', () => this.handlePointerOut(this))
    }

    private handlePointerDown(btn: Button): void
    {
        this.isPointerDown = true
        btn.rectangle.setFillStyle(btn.rectColor, 1)
    }

    private handlePointerUp(btn: Button): void
    {
        this.isPointerDown = false
        btn.rectangle.setFillStyle(btn.rectColor, 0.8)
    }

    private handlePointerOver(btn: Button): void
    {
        this.isPointerOver = true
        btn.rectangle.setFillStyle(btn.rectColor, 0.8)
    }

    private handlePointerOut(btn: Button): void
    {
        this.isPointerOver = false
        btn.rectangle.setFillStyle(btn.rectColor, 1)
        
    }

    public getIsPointerDown(): boolean
    {
        return this.isPointerDown
    }

    public getIsPointerOver(): boolean
    {
        return this.isPointerOver
    }
}
