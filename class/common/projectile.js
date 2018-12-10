const Collision = require('./collision.js');

module.exports = class Projectile extends require('./movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
            color: 'red',
			damage: 0,
			maxRange: 200,
			owner: null,

			//addEvent: 'addProjectile',
        });
    }

	init()
	{
		super.init();

		this.travelledDistance = 0;
	}

    update(modifier)
    {
		var lastPos = {x: this.centerX, y: this.centerY};
		this.moveByAngleAndSpeed(modifier);
		
		this.travelledDistance += this.constructor.Geometry.getDistanceBy2XY(
			lastPos.x,
			lastPos.y,
			this.centerX,
			this.centerY
		);
		if(this.travelledDistance >= this.maxRange)
			return this.remove();

		this.checkForCollision();
    }

	checkForCollision()
	{
		Object.entries( this.getState().entities ).forEach(([id, obj])=>
		{
			if( (this.owner && this.owner.id === obj.id) || !obj.HP)
				return;
			
			if(Collision.checkCollisionBetween2rectangles(this, obj))
			{
				obj.HP -= this.damage;
				this.remove();
				if( obj.HP <= 0)
					obj.remove();
			}
		});
	}

    /********** CLIENT FUNCTIONS **********/

	draw(ctx)
	{
		this.rotateContextByLookAngle(ctx); // rotate ctx ...
		ctx.fillStyle = this.color;
		ctx.fillRect(
			-this.width/2,
			-this.height/2,
			this.width,
			this.height,
		);
		ctx.restore(); // ... and restore it !
	}
}
