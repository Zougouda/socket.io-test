const Projectile = require('./projectile.js');
const Geometry = require('./geometry.js');

module.exports = class Weapon extends require('./movable.js')
{
    get defaultOptions()
    {
        return {
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/weapon/test-weapon.png',

			distance: 30,
			angle: 0,

			width: 4,
			height: 24,
			lookAngle: 90,

			onTop: false,

            cooldown: 100,
            projectileNb: 1,
			projectilesDeviation: 0,
            projectile: {}
        };
    }
    
    init()
    {
        super.init();
        this.shooting = false;
        this.lastShotTime = Date.now();
    }

    getOwner()
    {
        return null; // to be overriden
    }

	get centerX()
	{
		var myOwner = this.getOwner();
		if(!myOwner) 
			return;
        return Geometry.getXByAngleAndDistance(
            myOwner.centerX, 
            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), 
            this.distance
        );
	}
	get centerY()
	{
		var myOwner = this.getOwner();
		if(!myOwner) 
			return;
        return Geometry.getYByAngleAndDistance(
            myOwner.centerY, 
            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), 
            this.distance
        );
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
		this.lookAngle = this.getOwner().lookAngle;

        if(!this.shooting)
            return;

        var now = Date.now();
        if( this.lastShotTime + this.cooldown <= now )
        {
            this.lastShotTime = now;
            this.shoot();
        }
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
        				    this.centerX, 
        				    this.lookAngle, 
        				    this.projectile.height / 2 + this.height / 2
        				),
						centerY: Geometry.getYByAngleAndDistance(
        				    this.centerY, 
        				    this.lookAngle, 
        				    this.projectile.height / 2 + this.height / 2
        				),
                        lookAngle: this.lookAngle,
                    }
                )
            );
			bullet.getOwner = ()=>{return myOwner;};
            bullet.addTo(myOwner.getState(), myOwner.getSocket());
        }
    }

    /********** CLIENT FUNCTIONS **********/

	get clientCenterX()
	{
		var myOwner = this.getOwner();
		if(!myOwner) 
			return;
        return Geometry.getXByAngleAndDistance(
            myOwner.clientCenterX, 
            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), 
            this.distance
        );
	}
	get clientCenterY()
	{
		var myOwner = this.getOwner();
		if(!myOwner) 
			return;
        return Geometry.getYByAngleAndDistance(
            myOwner.clientCenterY, 
            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), 
            this.distance
        );
	}

	draw(ctx)
	{
		var ctxOptions = {};
		if(!this.onTop)
			ctxOptions.globalCompositeOperation = 'destination-over';

		super.draw(ctx, ctxOptions);
	}
};
