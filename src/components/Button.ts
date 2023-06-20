import * as Phaser from 'phaser'

export default class Button {
    private rectangle: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text

    private isPointerDown: boolean
    private isPointerOver: boolean

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width?: number | undefined,
        height?: number | undefined,
        fillColor?: number | undefined,
        fillAlpha?: number | undefined,
        content = ''
    ) {
        this.rectangle = scene.add.rectangle(x, y, width, height, fillColor, fillAlpha)
        console.log(this.rectangle)
        this.text = scene.add.text(x, y, content)
        this.isPointerDown = false
        this.isPointerOver = false

        this.rectangle.setInteractive()

        
    }

    public setInteractive(): void 
    {
        this.rectangle.on('pointerdown', this.handlePointerDown)

        this.rectangle.on('pointerup', this.handlePointerUp)

        this.rectangle.on('pointerover', this.handlePointerOver)

        this.rectangle.on('pointerout', this.handlePointerOut)
    }

    private handlePointerDown(): void
    {
        this.isPointerDown = true
        console.log(this.rectangle)
        //this.rectangle.setFillStyle(0xffff, 1)
    }

    private handlePointerUp(): void
    {
        this.isPointerDown = false
        //this.rectangle.setFillStyle(0xf5e3, 1)
    }

    private handlePointerOver(): void
    {
        this.isPointerOver = true
        
    }

    private handlePointerOut(): void
    {
        this.isPointerOver = false
        
    }

    public getIsPointerDown(): boolean
    {
        return this.isPointerDown
    }

    public getIsPointerOver(): boolean
    {
        return this.isPointerOver
    }

    public changeColor(fillColor: number, fillAlpha: number): void 
    {
        this.rectangle.setFillStyle(fillColor, fillAlpha)
    }
}
