import { productListKey } from './product-list'

export default class UserData {
    private static isBuy: boolean[] = []
    private static isInit = false
    private static allCoin = 0

    public static init(): void {
        if (UserData.isInit) return
        UserData.isInit = true
        for (let i = 0; i < productListKey.length; i++) {
            if (localStorage.getItem('product-' + String(i))) UserData.isBuy.push(true)
            else UserData.isBuy.push(false)
        }
        if (localStorage.getItem('allCoin')) this.allCoin = Number(localStorage.getItem('allCoin'))
        else this.allCoin = 0
    }

    public static getIsBuy(index: number): boolean {
        if (!UserData.isInit) UserData.init()
        return UserData.isBuy[index]
    }

    public static buy(index: number): void {
        if (!UserData.isInit) UserData.init()
        if (UserData.isBuy[index]) return
        UserData.isBuy[index] = true
        localStorage.setItem('product-' + String(index), 'true')
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
}
