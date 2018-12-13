const Collision = require('./collision.js');

module.exports = class Projectile extends require('./movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
			groups: ['projectiles'],
			
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/blue-beam.png',

            color: 'red',
			damage: 0,
			maxRange: 200,
			owner: null,
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
		var myOwner = this.getOwner();
		Object.values( this.getState().groups['ships'] ).forEach((obj)=>
		{
			if(myOwner.id === obj.id) // don't damage your owner
				return;
			if(!Collision.checkCollisionBetween2rectangles(this, obj))
				return;

			var damagesToInflict = this.damage;
			this.remove();
			obj.takeDamages(damagesToInflict);
		});
	}

    /********** CLIENT FUNCTIONS **********/

	draw(ctx)
	{
		super.draw(ctx, {globalAlpha: this.opacity});
	}
}
