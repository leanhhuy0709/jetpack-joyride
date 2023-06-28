export default class Product {
    private imageKey: string
    private name: string
    private price: number
    private isBuy: boolean

    public constructor(imageKey: string, name: string, price: number, isBuy: boolean)
    {
        this.imageKey = imageKey
        this.name = name
        this.price = price
        this.isBuy = isBuy
    }

    public getImageKey(): string
    {
        return this.imageKey
    }

    public getName(): string
    {
        return this.name
    }

    public getPrice(): number
    {
        return this.price
    }

    public getIsBuy(): boolean
    {
        return this.isBuy
    }

    public setIsBuy(isBuy: boolean): void
    {
        this.isBuy = isBuy
    }
}