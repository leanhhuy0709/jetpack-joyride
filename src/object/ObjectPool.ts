import Bullet from './Bullet'
import Explosion from './Explosion'

export default class ObjectPool {
    private static bullets: Bullet[] = []
    private static explosions: Explosion[] = []
    public static count = 0 //use to check

    public static getBullet(scene: Phaser.Scene, x: number, y: number, key: string): Bullet {
        if (ObjectPool.bullets.length > 0)
        {
            const bullet = ObjectPool.bullets.pop() as Bullet
            bullet.setVisible(true)
            bullet.setRotation(0)
            bullet.setFixedRotation()
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
}
