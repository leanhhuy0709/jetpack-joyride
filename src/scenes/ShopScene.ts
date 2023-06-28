import * as Phaser from 'phaser'
import { FONT_NAME, SCENE } from '../const/const'
import Button from '../components/Button'
import Product from '../object/shop/Product'
import ProductTexture from '../object/shop/ProductTexture'
import { productListKey, productListName, productListPrice } from '../object/shop/product-list'
import UserData from '../object/shop/UserData'

export default class ShopScene extends Phaser.Scene {
    private backBtn: Button

    public constructor() {
        super({
            key: SCENE.SHOP,
        })
    }

    public create(): void {
        this.add.rectangle(0, 0, 3200, 1600, 0x0000).setOrigin(0, 0).setAlpha(0.8)

        this.backBtn = new Button(this, 300, 100, 200, 80, 'BACK', {
            color: '#ffffff',
            fontSize: '40px',
            fontStyle: 'bold',
            fontFamily: FONT_NAME,
        })
        this.backBtn.setInteractive()

        this.add
            .text(1600, 20, 'SHOP', {
                fontSize: '110px',
                fontStyle: 'bold',
                fontFamily: FONT_NAME,
            })
            .setStroke('#000000', 10)
            .setOrigin(0.5, 0)

        this.add.rectangle(1600, 200, 2800, 1200, 0x1f2944).setOrigin(0.5, 0)
        let tmp = 350
        for (let i = 0; i < productListKey.length; i++) {
            const p1 = new Product(
                productListKey[i],
                productListName[i],
                productListPrice[i],
                UserData.getIsBuy(i)
            )
            new ProductTexture(this, 200, tmp, p1, 2800)
            tmp += 350
        }

        //this.add.container()
    }

    public update(_time: number, _delta: number): void {
        if (this.backBtn.getIsPointerDown()) {
            this.scene.stop(SCENE.SHOP)
            this.scene.resume(SCENE.MENU)
        }
    }
}
