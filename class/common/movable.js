class Movable extends require('./entity.js')
{
	get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			centerX: 50,
			centerY: 50,
			width: 50,
			height: 50,
			speed: 150, // px/s
			rotationSpeed: 540, // deg/s
			lookAngle: 90, // looking straight up : default angle
		});
	}

	get leftX()
	{
		return this.centerX - this.width/2;
	}
	get topY()
	{
		return this.centerY - this.height/2;
	}

	//get centerX()
	//{
	//	return this.x + this.width/2;
	//}
	//get centerY()
	//{
	//	return this.y + this.height / 2;
	//}

	init()
	{
		// var colors = ['red', 'blue', 'green', 'purple'];
		// if(!this.color)
		// 	this.color = colors[ Math.floor(Math.random() * colors.length) ];

		this.movement = {
			x: 0,
			y: 0,
		};
		this.clientCoords = {
			//centerX: this.centerX,
			//centerY: this.centerY,
			//lookAngle: this.lookAngle,
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
		this.centerX += this.movement.x * this.speed * modifier;
		this.centerY += this.movement.y * this.speed * modifier;
	}

	updateByAngleAndDistance(angle, distance)
	{
		this.centerX += distance * this.constructor.Geometry.getXByAngle(angle);
	    this.centerY += distance * this.constructor.Geometry.getYByAngle(angle);
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

		var centerX = (this.clientCoords.centerX || this.centerX), 
			centerY = (this.clientCoords.centerY || this.centerY);
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
		var centerX = (this.clientCoords.centerX || this.centerX), 
			centerY = (this.clientCoords.centerY || this.centerY);
		var lookAngle = (this.clientCoords.lookAngle || this.lookAngle);

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
		this.clientCoords.centerX = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerX, this.centerX, modifier);
		this.clientCoords.centerY = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerY, this.centerY, modifier);
		// this.drawLookAngle = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].lookAngle, this.lookAngle, modifier);
	}

	storeLastPosition()
	{
		this.serverUpdatesArray.push({
			centerX: this.centerX,
			centerY: this.centerY,
			lookAngle: this.lookAngle,
			timestamp: Date.now(),
		})
		if(this.serverUpdatesArray.length > 2)
			this.serverUpdatesArray.shift();
	}
};
Movable.Geometry = require('./geometry.js');

module.exports = Movable;
