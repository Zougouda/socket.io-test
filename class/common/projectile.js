const Collision = require('./collision.js');

module.exports = class Projectile extends require('./movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
            color: 'red',
			damage: 0,
			owner: null,

			addEvent: 'addProjectile',
			removeEvent: 'removeProjectile',
        });
    }

	init()
	{
		super.init();

	}

    update(modifier)
    {
        this.moveByAngleAndSpeed(modifier);

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
