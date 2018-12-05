module.exports = class Projectile extends require('./movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
            color: 'red',

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
    }

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
