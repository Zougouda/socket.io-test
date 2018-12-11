const Projectile = require('./projectile.js');
const Geometry = require('./geometry.js');

module.exports = class Weapon extends require('./entity.js')
{
    get defaultOptions()
    {
        return {
            cooldown: 100,
            projectileNb: 1,
            projectile: {}
        };
    }
    
    init()
    {
        this.lastShotTime = Date.now();
    }

    getOwner()
    {
        return null;
    }

    equipTo(shipObj)
    {
        shipObj.equipWeapon(this);
    }

    toggleShooting()
    {
        this.shooting = !this.shooting;
    }

    update(modifier)
    {
        if(!this.getOwner().shooting)
            return;

        var now = Date.now();
        if( this.lastShotTime + this.cooldown <= now )
        {
            this.lastShotTime = now;
            this.shoot();
        }
    }

	draw(ctx)
	{
		// TODO
	}

    shoot()
    {
        var myOwner = this.getOwner();
        for(var i = 0; i < this.projectileNb; i++)
        {
            var bullet = new Projectile(
                Object.assign
                (
                    Object.create(this.projectile), 
                    {
                        owner: myOwner,
                        centerX: Geometry.getXByAngleAndDistance(
                            myOwner.centerX, 
                            myOwner.lookAngle, 
                            myOwner.height/2 + this.projectile.height/2
                        ),
                        centerY: Geometry.getYByAngleAndDistance(
                            myOwner.centerY, 
                            myOwner.lookAngle, 
                            myOwner.height/2 + this.projectile.height/2
                        ),
                        lookAngle: myOwner.lookAngle,
                    }
                )
            );
            bullet.addTo(myOwner.getState(), myOwner.getSocket());
        }
    }
};
