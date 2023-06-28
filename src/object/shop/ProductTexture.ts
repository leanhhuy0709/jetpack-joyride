import Button from '../../components/Button'
import { FONT_NAME } from '../../const/const'
import Product from './Product'

export default class ProductTexture {
    private scene: Phaser.Scene
    private product: Product
    private container: Phaser.GameObjects.Container

    public constructor(scene: Phaser.Scene, x: number, y: number, product: Product, width: number) {
        this.scene = scene
        this.product = product

        const rect = scene.add.rectangle(200, 0, 200, 200, 0x7086a7).setOrigin(0.5, 0.5)

        const image = scene.add.image(200, 0, product.getImageKey()).setDisplaySize(100, 100).setOrigin(0.5, 0.5)

        const name = scene.add
            .text(500, 0, product.getName(), {
                fontSize: '60px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
            })
            .setStroke('#000000', 5)
            .setOrigin(0.5, 0.5)

        const price = scene.add
            .text(width - 500, 0, String(product.getPrice()), {
                fontSize: '60px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
                color: '#FFF0C8',
            })
            .setStroke('#000000', 5)
            .setOrigin(0.5, 0.5)
        let button
        if (product.getIsBuy()) {
            button = new Button(scene, width - 200, 0, 200, 80, 'EQUIP', {
                color: '#ffffff',
                fontSize: '40px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
            })
        } else {
            button = new Button(scene, width - 200, 0, 200, 80, 'BUY', {
                color: '#ffffff',
                fontSize: '40px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
            })
            button.setInteractive()
        }

        const line = scene.add.rectangle(0, 150, width, 5, 0xffffff).setOrigin(0, 0)


        

        this.container = scene.add.container(x, y, [
            rect,
            name,
            price,
            button.getRectangle(),
            button.getText(),
            button.getBlackRect(),
            line,
            image
        ])

    }
}