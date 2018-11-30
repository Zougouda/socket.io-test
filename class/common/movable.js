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
			playerID = null,
			color = null,
		} = options;
		Object.assign(this, {
			x, 
			y, 
			width, 
			height, 
			speed, 
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
		var drawX = this.drawX || this.x, 
			drawY = this.drawY || this.y;
		ctx.strokeRect(drawX, drawY, this.width, this.height);
	}

	initKeyboardControl()
	{
		
		window.addEventListener("keydown", (e)=>
		{
			/* Cancel default behaviour */
			switch(e.keyCode)
			{
				case 37:
				case 38:
				case 39:
				case 40:
					e.preventDefault();
				break;
			}
			switch(e.keyCode)
			{
				case 38: // up
					if(this.movement.y !== -1)
						this.setAxisMovement('y', -1);
				break;
				case 40: // down
					if(this.movement.y !== 1)
						this.setAxisMovement('y', 1);
				break;
				case 37: // left
					if(this.movement.x !== -1)
						this.setAxisMovement('x', -1);
				break;
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
				case 38: // up
					if(this.movement.y === -1)
						this.setAxisMovement('y', 0);
				break;
				case 40: // down
					if(this.movement.y === 1)
						this.setAxisMovement('y', 0);
				break;
				case 37: // left
					if(this.movement.x === -1)
						this.setAxisMovement('x', 0);
				break;
				case 39: //right
					if(this.movement.x === 1)
						this.setAxisMovement('x', 0);
				break;
			}
		}, false);
	}
};
