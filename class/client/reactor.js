const Geometry = require('../common/geometry.js');

class Reactor extends require('../common/entity.js')
{
	get defaultOptions()
	{
		return {
			distance: 30,
			angle: 0,
			cooldown: 15,
			particle: {},
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
        shipObj.equipReactor(this);
    }

	update(modifier)
	{
        var now = Date.now();
        if( this.lastShotTime + this.cooldown <= now )
        {
            this.lastShotTime = now;
            this.emitParticle();
        }
	}

	emitParticle()
	{
		var particle = new clientClasses.Particle(
			Object.assign(
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
					moveAngle: Geometry.getReverseAngle(this.getOwner().lookAngle),
				}
			)
		)
		.addTo(this.getOwner().getState());
	}
}

module.exports = Reactor;
