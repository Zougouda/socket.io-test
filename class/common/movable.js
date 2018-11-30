const Geometry = require('./geometry.js');

module.exports = class Movable
{
	constructor(options = {})
	{
		var {
			x = 50, 
			y = 50, 
			width = 20, 
			height = 20,
			speed = 150, // px/s
			rotationSpeed = 360, // deg/s
			lookAngle = 90, // looking straight up : default angle
			playerID = null,
			color = null,
		} = options;
		Object.assign(this, {
			x, 
			y, 
			width, 
			height, 
			speed, 
			rotationSpeed,
			lookAngle,
			playerID, 
			color
		});

		var colors = ['red', 'blue', 'green', 'purple'];
		if(!this.color)
			this.color = colors[ Math.floor(Math.random() * colors.length) ];

		this.movement = {
			x: 0,
			y: 0,
		};
		this.lookPointCoords = {};

		this.serverUpdatesArray = [];
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
		if(typeof clientState !== 'undefined')
		{
			clientState.socket.emit('setAxisMovement', {
				id: this.playerID,
				axis,
				value,
			})
		}
	}

	update(modifier)
	{
		this.x += this.movement.x * this.speed * modifier;
		this.y += this.movement.y * this.speed * modifier;
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

	draw(ctx)
	{
		ctx.strokeStyle = this.color;
		var centerX = (this.drawX || this.x) + this.width/2, 
			centerY = (this.drawY || this.y) + this.height/2;

		/* rotate ctx ... */
		ctx.save();
		ctx.translate(centerX, centerY);
		var rotationRadian = Math.PI / 180 * -(this.lookAngle - 90);
		ctx.rotate(rotationRadian);

		ctx.strokeRect(
			-this.width/2,
			-this.height/2,
			this.width, 
			this.height
		);

		ctx.restore(); // ... and restore it !

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
			
			if(typeof clientState !== 'undefined')
			{
				clientState.socket.emit('setLookPointCoords', {
					id: this.playerID,
					x,
					y,
				})
			}
		});
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

		var d = angleBetweenMeAndMouse - (this.lookAngle % 360);
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
			this.lookAngle = angleBetweenMeAndMouse;
	}
};
