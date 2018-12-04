class Movable extends require('./entity.js')
{
	get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			speed: 150, // px/s
			rotationSpeed: 540, // deg/s
			lookAngle: 90, // looking straight up : default angle
		});
	}

	get centerX()
	{
		return this.x + this.width/2;
	}
	get centerY()
	{
		return this.y + this.height / 2;
	}

	init()
	{
		// var colors = ['red', 'blue', 'green', 'purple'];
		// if(!this.color)
		// 	this.color = colors[ Math.floor(Math.random() * colors.length) ];

		this.movement = {
			x: 0,
			y: 0,
		};

		/* Client behaviour */
		if(typeof window !== 'undefined')
		{
			this.sprite = new window.Image();
			if(this.spriteSrc)
				this.sprite.src = this.spriteSrc

			this.serverUpdatesArray = [];
		}
	}

	update(modifier)
	{
		this.updateByMovement(modifier);
	}

	updateByMovement(modifier)
	{
		this.x += this.movement.x * this.speed * modifier;
		this.y += this.movement.y * this.speed * modifier;
	}

	updateByAngleAndDistance(angle, distance)
	{
		this.x += distance * this.constructor.Geometry.getXByAngle(angle);
	    this.y += distance * this.constructor.Geometry.getYByAngle(angle);
	}

	updateByAngleAndModifier(angle, modifier)
	{
		return this.updateByAngleAndDistance(angle, this.speed * modifier);
	}

	moveByAngleAndSpeed(modifier)
	{
		this.updateByAngleAndModifier(this.lookAngle, modifier);
	}

	updateLookAngle(modifier, angleToReach)
	{
		var d = angleToReach - (this.lookAngle % 360);
		if (d < (-180))
			d += 360;
		else if (d > 180)
			d -= 360;
		if (d < -this.rotationSpeed * modifier)
		{
			this.lookAngle -= this.rotationSpeed * modifier;
			if (this.lookAngle < 0)
				this.lookAngle += 360;
		}
		else if (d > this.rotationSpeed * modifier)
		{
			this.lookAngle += this.rotationSpeed * modifier;
			if (this.lookAngle > 360)
				this.lookAngle -= 360;
		}
		else
			this.lookAngle = angleToReach;
	}

	turnToLookPointCoords(modifier)
	{
		if(
			!this.lookPointCoords.x
			|| !this.lookPointCoords.y
			|| !modifier
		)
			return;

		var centerX = (this.drawX || this.x) + this.width/2, 
			centerY = (this.drawY || this.y) + this.height/2;
		var angleBetweenMeAndMouse = this.constructor.Geometry.getAngleBy2XY(
			centerX, 
			centerY, 
			this.lookPointCoords.x, 
			this.lookPointCoords.y
		);

		this.updateLookAngle(modifier, angleBetweenMeAndMouse);
	}

	/********** CLIENT FUNCTIONS **********/

	rotateContextByLookAngle(ctx)
	{
		var centerX = (this.drawX || this.x) + this.width/2, 
			centerY = (this.drawY || this.y) + this.height/2;
		var lookAngle = (this.drawLookAngle || this.lookAngle);

		ctx.save();
		ctx.translate(centerX, centerY);
		var rotationRadian = Math.PI / 180 * -(lookAngle - 90);
		ctx.rotate(rotationRadian);
	}

	draw(ctx)
	{
		this.rotateContextByLookAngle(ctx); // rotate ctx ...
		ctx.drawImage(
			this.sprite,
			-this.width/2,
			-this.height/2,
			this.width,
			this.height,
		);
		ctx.restore(); // ... and restore it !
	}

	updateClient(modifier)
	{
		this.updateByInterpolation(this.getState().now);
	}

	updateByInterpolation(now = Date.now())
	{
		if(this.serverUpdatesArray.length < 2)
			return;
		var timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;
		var timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;
		var modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;
		this.drawX = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].x, this.x, modifier);
		this.drawY = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].y, this.y, modifier);
		// this.drawLookAngle = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].lookAngle, this.lookAngle, modifier);
	}

	storeLastPosition()
	{
		this.serverUpdatesArray.push({
			x: this.x,
			y: this.y,
			lookAngle: this.lookAngle,
			timestamp: Date.now(),
		})
		if(this.serverUpdatesArray.length > 2)
			this.serverUpdatesArray.shift();
	}
};
Movable.Geometry = require('./geometry.js');

module.exports = Movable;