const Collision = require('./collision.js');

module.exports = class Projectile extends require('./movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
			//spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/1.png',
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/blue-beam.png',

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
		this.opacity = 1;
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

		var remainingLifeRatio = Math.min(1, (this.maxRange - this.travelledDistance) / this.maxRange );
		this.opacity = remainingLifeRatio;

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
		super.draw(ctx, {globalAlpha: this.opacity});
	}
}
