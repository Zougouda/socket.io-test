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

				playerShip = new commonClasses.Ship({
					name: data.name, 
					centerX: Math.random() * (this.canvasWidth - 100) + 50,
					centerY: Math.random() * (this.canvasHeight - 100) + 50,
				});
				playerShip.assignCrewMember(clientID, 'pilot');	
				playerShip.addTo(this, socket);

				player.shipID = playerShip.id;
				player.addTo(this, socket);

			})
			.on('disconnect', ()=>
			{
				if(playerShip)
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
