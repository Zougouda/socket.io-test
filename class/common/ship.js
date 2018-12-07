const Projectile = require('./projectile.js');

module.exports = class Ship extends require('./movable.js')
{
    get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			width: 42,
			height: 60,
			speed: 150, // px/s
			rotationSpeed: 540, // deg/s
			lookAngle: 90, // looking straight up : default angle
			HP: 100,
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',

			name: '',

			//addEvent: 'addShip',

			weapon: 
			{
				shooting: false,
				projectile: {
					width: 2, 
					height: 8, 
					speed: 750,
					damage: 10,
				},
				cooldown: 100,
			}
		});
	}

    init()
    {
        super.init();

        this.lookPointCoords = {};

		this.maxHP = this.HP;
    }

	onAdd()
	{
		/* client-side behaviour */
		if(typeof window !== 'undefined')
		{
			if(this.getState() && this.getState().isCurrentPlayer(this.id) )
			{
				this.initKeyboardControl();
				this.initMouseControl(this.getState().canvas);
			}
		}
	}

    update(modifier)
    {
        super.update(modifier);

        this.turnToLookPointCoords(modifier);

        /* poor shooting handling  */
		if(this.weapon.shooting)
		{
        	var now = Date.now();
			if(
				!this.weapon.lastShotTime 
				|| this.weapon.lastShotTime + this.weapon.cooldown < now
			)
			{
            	var bullet = new Projectile(
					Object.assign
					(
						Object.create(this.weapon.projectile), 
						{
							owner: this,
							centerX: this.constructor.Geometry.getXByAngleAndDistance(this.centerX, this.lookAngle, this.height/2 + this.weapon.projectile.height/2),
							centerY: this.constructor.Geometry.getYByAngleAndDistance(this.centerY, this.lookAngle, this.height/2 + this.weapon.projectile.height/2),
							lookAngle: this.lookAngle,
						}
					)
				);
            	bullet.addTo(this.getState(), this.getSocket());

				/* TODO remove this -> auto-delete projectile after a while */
				setTimeout(()=>
				{
					bullet.remove();
				}, 1000);

            	this.weapon.lastShotTime = now;
			}
		}
    }

    /********** CLIENT FUNCTIONS **********/


	draw(ctx)
	{
		super.draw(ctx);

		/* write player's name if has one */
		if(this.name)
		{
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.font = '12px Arial';
			var colorByRemainingHP = commonClasses.Graphic.getDynamicColor({
				startColor: [0, 130, 0],
				endColor: [255, 0, 0],
				ratio: this.HP / this.maxHP,
				opacity: 1,
			});
			ctx.fillStyle = colorByRemainingHP;
			ctx.fillText(this.name, this.clientCenterX, this.clientCenterY + this.height/2)
		}
	}
    
    updateClient(modifier)
	{
		super.updateClient(modifier);
		// this.turnToLookPointCoords(modifier);
	}

	setAxisMovement(axis, value)
	{
		this.movement[axis] = value;
		if(typeof this.getState() !== 'undefined')
		{
			this.getState().socket.emit('setAxisMovement', {
				id: this.id,
				axis,
				value,
			});
		}
	}

    addAxisMovement(axis, value)
	{
		var currentValue = this.movement[axis];
		var valueAfterAdd = currentValue + value;
		if(valueAfterAdd >= -1 && valueAfterAdd <= 1 )
			this.setAxisMovement(axis, valueAfterAdd)
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
					this.addAxisMovement('y', -1);
				break;
				case 83: // S
				case 40: // down
					this.addAxisMovement('y', 1);
				break;
				case 81: // Q
				case 37: // left
					this.addAxisMovement('x', -1);
				break;
				case 68: // D
				case 39: //right
					this.addAxisMovement('x', 1);
				break;
			}
		}, false);

		window.addEventListener("keyup", (e)=>
		{
			switch(e.keyCode)
			{
				case 90: // Z
				case 38: // up
					this.addAxisMovement('y', 1);
				break;
				case 83: // S
				case 40: // down
					this.addAxisMovement('y', -1);
				break;
				case 81: // Q
				case 37: // left
						this.addAxisMovement('x', 1);
				break;
				case 68: // D
				case 39: //right
						this.addAxisMovement('x', -1);
				break;
			}
		}, false);
	}

	initMouseControl(domContainer)
	{
		domContainer.addEventListener('mousemove', (e)=>
		{
			var rect = domContainer.getBoundingClientRect();
			var x = (e.pageX - rect.left) * e.target.ratio,
				y = (e.pageY - rect.top) * e.target.ratio;

			this.lookPointCoords.x = x;
			this.lookPointCoords.y = y;
			
			if(typeof this.getState() !== 'undefined')
			{
				this.getState().socket.emit('setLookPointCoords', {
					id: this.id,
					x,
					y,
				});
			}
		});

		domContainer.addEventListener('mousedown', (e)=>
		{
			if(typeof this.getState() !== 'undefined')
			{
				this.getState().socket.emit('isShooting', {
					id: this.id,
					value: true,
				});
			}
		});

		domContainer.addEventListener('mouseup', (e)=>
		{
			if(typeof this.getState() !== 'undefined')
			{
				this.getState().socket.emit('isShooting', {
					id: this.id,
					value: false,
				});
			}
		});
	}
};
