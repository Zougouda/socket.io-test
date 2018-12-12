const Weapon = require('./weapon.js');
const Reactor = require('../client/reactor.js');

module.exports = class Ship extends require('./movable.js')
{
    get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			width: 42,
			height: 60,

			speed: 400, // px/s
			thrust: {
				forward: 60,
				backward: 20,
				left: 20,
				right: 20,
			},
			rotationSpeed: 540, // deg/s

			lookAngle: 90, // looking straight up : default angle
			HP: 100,
			spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',

			name: '',

			//addEvent: 'addShip',

			reactorOptions: [
				{
					distance: 30,
					angle: 12,
					cooldown: 15,
					particle: {
						speed: 1,
						duration: 150,
						radius: 4,
					}
				},
				{
					distance: 30,
					angle: -12,
					cooldown: 15,
					particle: {
						speed: 1,
						duration: 150,
						radius: 4,
					}
				},
			],

			weaponOptions: 
			[
				{
					projectile: {
						width: 4, 
						height: 16, 
						speed: 1200,
						damage: 10,
						maxRange: 600,
					},
					cooldown: 100,

					distance: 15,
					angle: -110,

					width: 4,
					height: 24,
					lookAngle: 90,
				},
				{
					projectile: {
						width: 4, 
						height: 16, 
						speed: 1200,
						damage: 10,
						maxRange: 600,
					},
					cooldown: 100,

					distance: 15,
					angle: 110,

					width: 4,
					height: 24,
					lookAngle: 90,
				},
			]
		});
	}

	/* Don't get out of the screen */
	setCenterX(value)
	{
		this.centerX = value;
		if(this.centerX < 0 || this.centerX > this.getState().canvasWidth )
		{
			this.centerX = Math.min( Math.max( value, 0  ), this.getState().canvasWidth );
			this.moveVector.speed = 0;
		}

	}
	setCenterY(value)
	{
		this.centerY = value;
		if(this.centerY < 0 || this.centerY > this.getState().canvasHeight )
		{
			this.centerY = Math.min( Math.max( value, 0  ), this.getState().canvasHeight );
			this.moveVector.speed = 0;
		}
	}

    init()
    {
        super.init();

        this.lookPointCoords = {};

		this.maxHP = this.HP;

		/* TODO better */
		this.thrusting = {
			forward: false,
			backward: false,
			left: false,
			right: false,
		};

		this.weapons = [];
		if( this.weaponOptions )
		{
			this.weaponOptions
			.forEach((weaponOption)=>
			{
				var weaponToEquip = new Weapon(weaponOption);
				this.equipWeapon( weaponToEquip );
			});
		}

		this.reactors = [];
		if(typeof window !== 'undefined' && this.reactorOptions )
		{
			this.reactorOptions
			.forEach((reactorOption)=>
			{
				var reactorToEquip = new Reactor(reactorOption);
				this.equipReactor( reactorToEquip );
			});
		}
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
		/* update moveVector */
		Object.entries(this.thrusting)
		.forEach(([direction, value])=>
		{
			if(value)
			{
				var angleToApply;
				var speedToApply = this.thrust[direction];
				switch(direction)
				{
					case 'forward':
						angleToApply = this.lookAngle;
					break;
					case 'backward':
						angleToApply = this.constructor.Geometry.getReverseAngle(this.moveVector.angle);
					break;
					case 'right':
						angleToApply = this.lookAngle - 90;
						if( angleToApply < 0)
							angleToApply += 360;
						//console.log('left', angleToApply);
					break;
					case 'left': 
						angleToApply = (this.lookAngle + 90) % 360;
						//console.log('right', angleToApply);
					break;
				}

				this.moveVector = this.constructor.Geometry.sum2vectors(
					this.moveVector.angle, 
					this.moveVector.speed, 
					angleToApply, 
					speedToApply
				);
			}
		});
		this.moveVector.speed = Math.max(0, Math.min(this.moveVector.speed, this.maxSpeed ) );

        //super.update(modifier);
		this.moveByVector(modifier);

		this.moveVector.speed = Math.max(0, this.moveVector.speed -3); // moveVector decay

		this.turnToLookPointCoords(modifier);
		
		this.weapons
		.forEach((weapon) => 
		{
			weapon.update(modifier);
		});
	}
	
	equipWeapon(weapon)
	{
		this.weapons.push(weapon);
		weapon.getOwner = ()=>{return this};
	}

	equipReactor(reactor)
	{
		this.reactors.push(reactor);
		reactor.getOwner = ()=>{return this};
	}

    /********** CLIENT FUNCTIONS **********/

	/* don't get offscreen ! */
	get clientCenterX()
	{
		var x = super.clientCenterX;
		return Math.min( Math.max( x, 0  ), this.getState().canvasWidth );
	}
	get clientCenterY()
	{
		var y = super.clientCenterY;
		return Math.min( Math.max( y, 0  ), this.getState().canvasHeight );
	}

	get shortName()
	{
		if(!this.name)
			return '';

		String.prototype.trunc = String.prototype.trunc ||
		function(n)
		{
			return (this.length > n) ? this.substr(0, n-1) + '...' : this;
	    };

		return this.name.trunc( 16 );
	}

	draw(ctx)
	{
		this.weapons
		.forEach( (weapon)=>
		{
			weapon.draw(ctx);
		});

		super.draw(ctx);

		/* write player's name if has one */
		if(this.shortName)
		{
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.font = 'bold 16px Arial';
			var colorByRemainingHP = clientClasses.Graphic.getDynamicColor({
				startColor: [0, 130, 0],
				endColor: [255, 0, 0],
				ratio: this.HP / this.maxHP,
				opacity: 1,
			});
			ctx.fillStyle = colorByRemainingHP;
			ctx.fillText(this.shortName, this.clientCenterX, this.clientCenterY + this.height/2)
		}
	}
    
    updateClient(modifier)
	{
		super.updateClient(modifier);

		this.reactors
		.forEach( (reactor)=>
		{
			reactor.update(modifier);
		});
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
					//this.addAxisMovement('y', -1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'forward',
						value: 1,
					});
				break;
				case 83: // S
				case 40: // down
					//this.addAxisMovement('y', 1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'backward',
						value: 1,
					});
				break;
				case 81: // Q
				case 37: // left
					//this.addAxisMovement('x', -1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'left',
						value: 1,
					});
				break;
				case 68: // D
				case 39: //right
					//this.addAxisMovement('x', 1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'right',
						value: 1,
					});
				break;
			}
		}, false);

		window.addEventListener("keyup", (e)=>
		{
			switch(e.keyCode)
			{
				case 90: // Z
				case 38: // up
					//this.addAxisMovement('y', 1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'forward',
						value: 0,
					});
				break;
				case 83: // S
				case 40: // down
					//this.addAxisMovement('y', -1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'backward',
						value: 0,
					});
				break;
				case 81: // Q
				case 37: // left
					//this.addAxisMovement('x', 1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'left',
						value: 0,
					});
				break;
				case 68: // D
				case 39: //right
					//this.addAxisMovement('x', -1);
					this.getState().socket.emit('thrustingDirection', {
						id: this.id,
						side: 'right',
						value: 0,
					});
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
