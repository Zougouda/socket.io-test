const Geometry = require('../common/geometry.js');

class Reactor extends require('../common/entity.js')
{
	get defaultOptions()
	{
		return {
			distance: 30,
			angle: 0,

			cooldown: 15,
			particle: {
				speed: 1,
				duration: 150,
				radius: 4,
			},
		};
	}

    init()
    {
        this.lastShotTime = Date.now();
		//this.maxParticleRadius = this.particle.radius;
    }

    getOwner()
    {
        return null;
    }

    equipTo(shipObj)
    {
        shipObj.equipReactor(this);
    }

	update(modifier)
	{
		if( !this.getOwner().thrusting['forward'] )
			return;

        var now = Date.now();
        if( this.lastShotTime + this.cooldown <= now )
        {
            this.lastShotTime = now;
            this.emitParticle();
        }
	}

	emitParticle()
	{

		var particlelOptions = Object.assign
		(
			this.particle, 
			{
				centerX: Geometry.getXByAngleAndDistance(
					this.getOwner().clientCenterX, 
					Geometry.getReverseAngle(this.getOwner().lookAngle + this.angle), this.distance
				),
				centerY: Geometry.getYByAngleAndDistance(
					this.getOwner().clientCenterY, 
					Geometry.getReverseAngle(this.getOwner().lookAngle + this.angle), this.distance
				),
				//radius: this.maxParticleRadius * this.getOwner().moveVector.speed / this.getOwner().maxSpeed,
				moveAngle: Geometry.getReverseAngle(this.getOwner().lookAngle),
			}
		);

		var particle = new clientClasses.Particle(particlelOptions)
		.addTo(this.getOwner().getState());
	}
}

module.exports = Reactor;
