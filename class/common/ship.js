const Weapon = require('./weapon.js');
const Reactor = require('../client/reactor.js');
const Collision = require('./collision.js');

module.exports = class Ship extends require('./movable.js')
{
    get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			groups: ['ships'],
			playerCrew: {},

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
					angle: 110,

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
					angle: -110,

					width: 4,
					height: 24,
					lookAngle: 90,
				},
			],

			getMouseControlsByAssignment: ()=>
			{
				return {
					pilot: 
					{
						onMouseMove: (e)=>
						{
							this.setLookPoint(e);
						},
						onMouseDown: (e)=>
						{
							if(e.which === 1) // left mouse button
								this.toggleWeapons([0]);
							else if(e.which === 3) // right mouse button
								this.toggleWeapons([1]);
						},
					}
				};
			},

			getKeyControlsByAssignment: ()=>
			{
				return {
					pilot: 
					{
						onKeyDown: (e)=>
						{
							this.setThrustByKeyDown(e);
						},
						onKeyUp: (e)=>
						{
							this.setThrustByKeyUp(e);
						},
					}
				};
			},
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

		this.checkForCollision();
	}

	checkForCollision()
	{
		Object.values( this.getState().groups['ships'] ).forEach((obj)=>
		{
			if(obj.id === this.id) // don't enter in colision with yourself XD
				return;
			if(!Collision.checkCollisionBetween2rectangles(this, obj))
				return;

			/* Push the other ship away based on my own vector */
			if(obj.moveVector)
			{
				obj.moveVector = this.constructor.Geometry.sum2vectors(
					this.moveVector.angle, 
					this.moveVector.speed, 
					obj.moveVector.angle, 
					obj.moveVector.speed, 
				);
			}

			/* Crash! Take my damages */
			var damageInflictedToOtherShip = this.maxHP/2 * this.moveVector.speed / this.maxSpeed;
			obj.takeDamages(damageInflictedToOtherShip);

			/* Bounce me back as well */
			this.moveVector = this.constructor.Geometry.sum2vectors(
				this.moveVector.angle, 
				this.moveVector.speed, 
				this.constructor.Geometry.getReverseAngle(obj.moveVector.angle), 
				this.moveVector.speed *1.5,
			);
		});
	}

	takeDamages(amount)
	{
		this.HP -= amount;
		if( this.HP <= 0)
			this.remove();
	}

	assignCrewMember(playerID, assignment)
	{
		this.playerCrew[assignment] = playerID;
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

	remove()
	{
		/* remove any player inside the ship */
		Object.values(this.playerCrew).forEach( (playerID)=>
		{
			var player = this.getState().players[playerID];
			if( player )
				player.remove();
		} );
		super.remove();
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
		super.draw(ctx);

		this.weapons
		.forEach( (weapon)=>
		{
			weapon.draw(ctx);
		});

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

	setThrustByKeyDown(e)
	{
		var clientState = this.getState();

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
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'forward',
					value: 1,
				});
			break;
			case 83: // S
			case 40: // down
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'backward',
					value: 1,
				});
			break;
			case 81: // Q
			case 37: // left
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'left',
					value: 1,
				});
			break;
			case 68: // D
			case 39: //right
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'right',
					value: 1,
				});
			break;
		}
	}

	setThrustByKeyUp(e)
	{
		var clientState = this.getState();

		switch(e.keyCode)
		{
			case 90: // Z
			case 38: // up
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'forward',
					value: 0,
				});
			break;
			case 83: // S
			case 40: // down
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'backward',
					value: 0,
				});
			break;
			case 81: // Q
			case 37: // left
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'left',
					value: 0,
				});
			break;
			case 68: // D
			case 39: //right
				clientState.socket.emit('thrustingDirection', {
					id: this.id,
					side: 'right',
					value: 0,
				});
			break;
		}
	}

	setLookPoint(e)
	{
		var rect = this.getState().canvas.getBoundingClientRect();
		var x = (e.pageX - rect.left) * e.target.ratio,
			y = (e.pageY - rect.top) * e.target.ratio;

		this.getState().socket.emit('setLookPointCoords', {
			id: this.id,
			x,
			y,
		});
	}

	toggleWeapons(weaponIDs = null)
	{
		this.getState().socket.emit('toggleWeaponsShooting', {
			id: this.id,
			weaponIDs,
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
};
