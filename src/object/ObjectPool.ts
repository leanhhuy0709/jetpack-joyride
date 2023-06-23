import { BULLET, EXPLOSION } from '../const/const'
import Bullet from './Bullet'
import Explosion from './Explosion'
import Obstacle from './Obstacle'
import Zap from './Zap'

export default class ObjectPool {
    private static bullets: Bullet[] = []
    private static explosions: Explosion[] = []
    private static zaps: Zap[] = []
    public static count = 0 //use to check

    public static init(_scene: Phaser.Scene): void {
        ObjectPool.clear()
        for (let i = 0; i < 20; i++) {
            ObjectPool.removeBullet(new Bullet(_scene, 0, 0, BULLET))
            ObjectPool.removeExplosion(new Explosion(_scene, 0, 0, EXPLOSION))
            ObjectPool.removeZap(new Zap(_scene, -100, -100, -100, -100))
        }
    }

    public static getBullet(scene: Phaser.Scene, x: number, y: number, key: string): Bullet {
        if (ObjectPool.bullets.length > 0) {
            const bullet = ObjectPool.bullets.pop() as Bullet
            bullet.setVisible(true)
            bullet.setAll(scene, x, y, key)
            return bullet
        }
        ObjectPool.count++
        return new Bullet(scene, x, y, key)
    }

    public static removeBullet(bullet: Bullet): void {
        bullet.setVisible(false)
        ObjectPool.bullets.push(bullet)
    }

    public static getExplosion(scene: Phaser.Scene, x: number, y: number, key: string): Explosion {
        if (ObjectPool.explosions.length > 0) {
            const explosion = ObjectPool.explosions.pop() as Explosion
            explosion.setVisible(true)
            explosion.setAll(scene, x, y, key)
            return explosion
        }
        ObjectPool.count++
        return new Explosion(scene, x, y, key)
    }

    public static removeExplosion(explosion: Explosion): void {
        explosion.setVisible(false)
        ObjectPool.explosions.push(explosion)
    }

    public static getZap(scene: Phaser.Scene, x1: number, y1: number, x2: number, y2: number): Zap {
        if (ObjectPool.zaps.length > 0) {
            const zap = ObjectPool.zaps.pop() as Zap
            zap.setAll(scene, x1, y1, x2, y2)
            return zap
        }
        ObjectPool.count++
        return new Zap(scene, x1, y1, x2, y2)
    }

    public static removeZap(zap: Zap): void {
        ObjectPool.zaps.push(zap)
    }

    public static removeObstacle(obstacle: Obstacle): void {
        if (obstacle instanceof Zap) {
            ObjectPool.removeZap(obstacle)
        }
        //...
    }

    public static clear(): void {
        ObjectPool.bullets = []
        ObjectPool.explosions = []
        ObjectPool.count = 0
    }
}
