import { productListKey, productListPrice } from './product-list'

export enum PRODUCT_STATE {
    EQUIPPED = 'equiped',
    NOT_EQUIPPED = 'not_equipped',
    HAVE_NOT_BOUGHT_YET = '',
}

export default class UserData {
    private static isInit = false
    private static allCoin = 0
    private static productState: PRODUCT_STATE[] = []

    public static init(): void {
        if (UserData.isInit) return
        UserData.isInit = true
        for (let i = 0; i < productListKey.length; i++) {
            const tmp = localStorage.getItem('product-' + String(i))
            if (tmp == 'equiped') UserData.productState.push(PRODUCT_STATE.EQUIPPED)
            else if (tmp == 'not_equipped') UserData.productState.push(PRODUCT_STATE.NOT_EQUIPPED)
            else UserData.productState.push(PRODUCT_STATE.HAVE_NOT_BOUGHT_YET)
        }
        if (localStorage.getItem('allCoin')) this.allCoin = Number(localStorage.getItem('allCoin'))
        else this.allCoin = 0
    }

    public static getProductState(index: number): PRODUCT_STATE {
        if (!UserData.isInit) UserData.init()
        if (index >= UserData.productState.length) return PRODUCT_STATE.HAVE_NOT_BOUGHT_YET
        return UserData.productState[index]
    }

    public static canBuyProduct(index: number): boolean {
        if (!UserData.isInit) UserData.init()
        return (
            UserData.productState[index] == PRODUCT_STATE.HAVE_NOT_BOUGHT_YET &&
            UserData.allCoin >= productListPrice[index]
        )
    }

    public static buy(index: number, price: number): void {
        if (!UserData.isInit) UserData.init()
        if (UserData.productState[index] != PRODUCT_STATE.HAVE_NOT_BOUGHT_YET) return
        UserData.productState[index] = PRODUCT_STATE.NOT_EQUIPPED
        UserData.allCoin -= price
        localStorage.setItem('product-' + String(index), 'not_equipped')
        UserData.saveCoin()
    }

    public static equip(index: number): void {
        if (!UserData.isInit) UserData.init()
        if (UserData.productState[index] != PRODUCT_STATE.NOT_EQUIPPED) return
        UserData.productState[index] = PRODUCT_STATE.EQUIPPED
        localStorage.setItem('product-' + String(index), 'equiped')
    }

    public static unequip(index: number): void {
        if (!UserData.isInit) UserData.init()
        if (UserData.productState[index] != PRODUCT_STATE.EQUIPPED) return
        UserData.productState[index] = PRODUCT_STATE.NOT_EQUIPPED
        localStorage.setItem('product-' + String(index), 'not_equipped')
    }

    public static getAllCoin(): number {
        if (!UserData.isInit) UserData.init()
        return UserData.allCoin
    }

    public static addCoin(coin: number): void {
        if (!UserData.isInit) UserData.init()
        UserData.allCoin += coin
        localStorage.setItem('allCoin', `${UserData.allCoin}`)
    }

    public static saveCoin(): void {
        localStorage.setItem('allCoin', `${UserData.allCoin}`)
    }
}
