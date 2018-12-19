const commonClasses = require('../common/index.js');

module.exports = class ServerState extends require('../common/state.js')
{
	constructor(options = {})
	{
		super(options);

		this.frequency = 1000 / 30; // FPS
		this.latency = 0; // simulate server lag here

		var {io = null} = options;
		this.io = io;
		if(!io)
			throw('Missing mandatory option in ServerState instance !');

		this.observer = this.jsonPatch.observe(this.entities);
		this.initSocket();
		this.initLoop();
	}

	initSocket()
	{
		this.io.on('connection', (socket)=>
		{
			var clientID = socket.client.id;
			var player = null;
			var playerShip = null;

			/* retrieve every player and ship on connect */
			Object.values(this.entities)
			.concat( Object.values(this.players) )
			.forEach( (obj)=>
			{
				obj.emitAdd(socket);
			});

			socket
			.on('newPlayerShip', (data)=>
			{
				player = new commonClasses.Player({
					id: clientID,
					name: data.name,
				});

				var addNewPlayerShip = ( shipKey )=>
				{
					var shipKey = shipKey || 'baseShip'; // you can choose a specific ship

					var baseShipConfig = commonClasses.Ship.config[shipKey];
					var shipFullOptions = Object.assign(
						{
							centerX: Math.random() * (this.canvasWidth - 100) + 50,
							centerY: Math.random() * (this.canvasHeight - 100) + 50,
						},
						baseShipConfig
					);
					playerShip = new commonClasses.Ship(shipFullOptions);
					playerShip.assignCrewMember(player, 'pilot');	
					playerShip.addTo(this, socket);
				};
				var addPlayerToExistingShip = ( existingShipID, assignment )=>
				{
					if(!existingShipID || !assignment)
						return false;
					if(!this.entities[existingShipID])
						return false;

					playerShip = this.entities[existingShipID];
					playerShip.assignCrewMember(player, assignment);
					return true;
				};

				var addedPlayerToShip = addPlayerToExistingShip(data.shipID, data.assignment); // try to join another player's ship
				if(!addedPlayerToShip)
					addNewPlayerShip(data.shipToPick); // new player
				if(playerShip)
					player.shipID = playerShip.id;

				setTimeout(()=>
				{
					player.addTo(this, socket);
				}, 100);

			})
			.on('disconnect', ()=>
			{
				if(playerShip && playerShip.playerCrew.pilot === clientID)
					playerShip.remove();
			})
			.on('thrustingDirection', (data)=>
			{
				try
				{
					this.entities[data.id].thrusting[data.side] = data.value;
				}
				catch(e)
				{
					this.logErr(e);
				}
			})
			.on('setLookPointCoords', (data)=>
			{
				try
				{
					this.entities[data.id].lookPointCoords = {x: data.x, y: data.y};
				}
				catch(e)
				{
					this.logErr(e);	
				}
			})
			.on('setWeaponsLookPointCoords', (data)=>
			{
				try
				{
					var ship = this.entities[data.id];
					var weaponIDs = data.weaponIDs || Object.keys(ship.weapons);
					weaponIDs.forEach( (weaponID)=>
					{
						var weapon = ship.weapons[weaponID];
						weapon.lookPointCoords = {x: data.x, y: data.y};
					} );
				}
				catch(e)
				{
					this.logErr(e);	
				}
			})
			.on('toggleWeaponsShooting', (data)=>
			{
				try
				{
					var ship = this.entities[data.id];
					var weaponIDs = data.weaponIDs || Object.keys(ship.weapons);
					weaponIDs.forEach( (weaponID)=>
					{
						var weapon = ship.weapons[weaponID];
						weapon.shooting = !weapon.shooting;
					} );
				}
				catch(e)
				{
					this.logErr(e);	
				}
			})
			;
		});
	}

    tick(modifier)
    {
    	Object.entries(this.entities).forEach( ([key, obj])=>
    	{
    	    obj.update(modifier);
		});
		this.notifyClients();
    }

	notifyClients()
	{
		if(!this.io)
			return;

		var changes = this.jsonPatch.generate(this.observer);
		changes = changes.filter((change)=>
		{
			return (
				change.op === 'replace' // Only send replacements patches to all clients
				|| (change.op === 'add' && change.path.includes('playerCrew') )
			);
		});

		if(changes.length > 0)
		{
			setTimeout(()=>
			{
				this.io.emit('updateEntities', changes);
			}, this.latency);
		}
	}

	initLoop()
	{
		setInterval(()=>
		{
			var secondsElapsed = this.getSecondsSinceLastTick();
			this.tick(secondsElapsed);
		}, this.frequency);
	}
}
