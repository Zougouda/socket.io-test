const Projectile = require('./projectile.js');
const Geometry = require('./geometry.js');

class Weapon extends require('./movable.js')
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
            relativeLookAngle: null,
            rotationSpeed: 540,

            onTop: false,
            hasPointer: false,

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
        if(this.lookPointCoords.x && this.lookPointCoords.y) // following a mouse
            this.turnToLookPointCoords(modifier);
        else if(this.relativeLookAngle) // has a fixed angle
            this.lookAngle = Geometry.normalizeAngle( this.getOwner().lookAngle + this.relativeLookAngle );
        else // follow the ship's angle
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

        this.drawLaserPointer(ctx);
    }
    
    drawLaserPointer(ctx)
    {
        if(!this.hasPointer)
            return false;
        var drawPointer = false;
        Object.values(this.getOwner().playerCrew).forEach( (playerID)=>
        {
            if(drawPointer)
                return;
            if( clientState.isCurrentPlayer( playerID ) )
                drawPointer = true;
        } );
        if(!drawPointer)
            return;

        var startX = Geometry.getXByAngleAndDistance(
            this.clientCenterX, 
            this.lookAngle, 
            this.height / 2
        );
        var startY= Geometry.getYByAngleAndDistance(
            this.clientCenterY, 
            this.lookAngle, 
            this.height / 2
        );
        var endX = Geometry.getXByAngleAndDistance(
            startX, 
            this.lookAngle, 
            this.projectile.maxRange
        );
        var endY = Geometry.getYByAngleAndDistance(
            startY, 
            this.lookAngle, 
            this.projectile.maxRange
        );

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.strokeStyle = 'red';
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
}

Weapon.config = require('./config/weapon.js');

module.exports = Weapon;
