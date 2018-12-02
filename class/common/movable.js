const Geometry = require('./geometry.js');

module.exports = class Movable extends require('./entity.js')
{
	get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			x: 50,
			y: 50,
			width: 42,
			height: 60,
			speed: 150, // px/s
			rotationSpeed: 540, // deg/s
			lookAngle: 90, // looking straight up : default angle
			playerID: null,
			// color: null,
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',
		});
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
		this.lookPointCoords = {};

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
		this.x += this.movement.x * this.speed * modifier;
		this.y += this.movement.y * this.speed * modifier;
		this.turnToLookPointCoords(modifier);
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
		var angleBetweenMeAndMouse = Geometry.getAngleBy2XY(
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

		ctx.save();
		ctx.translate(centerX, centerY);
		var rotationRadian = Math.PI / 180 * -(this.lookAngle - 90);
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
		this.updateByInterpolation(this.clientState.now);
		this.turnToLookPointCoords(modifier);
	}

	updateByInterpolation(now = Date.now())
	{
		if(this.serverUpdatesArray.length < 2)
			return;
		var timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;
		var timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;
		var modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;
		this.drawX = Geometry.lerp(this.serverUpdatesArray[1].x, this.x, modifier);
		this.drawY = Geometry.lerp(this.serverUpdatesArray[1].y, this.y, modifier);
	}

	storeLastPosition()
	{
		this.serverUpdatesArray.push({
			x: this.x,
			y: this.y,
			timestamp: Date.now(),
		})
		if(this.serverUpdatesArray.length > 2)
			this.serverUpdatesArray.shift();
	}

	setAxisMovement(axis, value)
	{
		this.movement[axis] = value;
		if(typeof this.clientState !== 'undefined')
		{
			this.clientState.socket.emit('setAxisMovement', {
				id: this.playerID,
				axis,
				value,
			})
		}
	}

	initKeyboardControl()
	{
		window.addEventListener("keydown", (e)=>
		{
			/* Cancel default behaviour */
			switch(e.keyCode)
			{
				case 90:
				case 83:
				case 81:
				case 68:

				case 37:
				case 38:
				case 39:
				case 40:
					e.preventDefault();
				break;
			}
			switch(e.keyCode)
			{
				case 90: // Z
				case 38: // up
					if(this.movement.y !== -1)
						this.setAxisMovement('y', -1);
				break;
				case 83: // S
				case 40: // down
					if(this.movement.y !== 1)
						this.setAxisMovement('y', 1);
				break;
				case 81: // Q
				case 37: // left
					if(this.movement.x !== -1)
						this.setAxisMovement('x', -1);
				break;
				case 68: // D
				case 39: //right
					if(this.movement.x !== 1)
						this.setAxisMovement('x', 1);
				break;
			}
		}, false);

		window.addEventListener("keyup", (e)=>
		{
			switch(e.keyCode)
			{
				case 90: // Z
				case 38: // up
					if(this.movement.y === -1)
						this.setAxisMovement('y', 0);
				break;
				case 83: // S
				case 40: // down
					if(this.movement.y === 1)
						this.setAxisMovement('y', 0);
				break;
				case 81: // Q
				case 37: // left
					if(this.movement.x === -1)
						this.setAxisMovement('x', 0);
				break;
				case 68: // D
				case 39: //right
					if(this.movement.x === 1)
						this.setAxisMovement('x', 0);
				break;
			}
		}, false);
	}

	initMouseControl(domContainer)
	{
		domContainer.addEventListener('mousemove', (e)=>
		{
			var rect = domContainer.getBoundingClientRect();
			var x = e.pageX - rect.left,
				y = e.pageY - rect.top;

			this.lookPointCoords.x = x;
			this.lookPointCoords.y = y;
			
			if(typeof this.clientState !== 'undefined')
			{
				this.clientState.socket.emit('setLookPointCoords', {
					id: this.playerID,
					x,
					y,
				})
			}
		});
	}
};
