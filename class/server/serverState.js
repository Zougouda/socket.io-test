//const Movable = require('../common/movable.js');
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
			Object.entries(this.entities).forEach( ([id, obj])=>
			{
				//if(id === playerShip.id)
				//	return;
				obj.emitAdd(socket); // send all others existing objects to client
			});
			Object.entries(this.players).forEach( ([id, obj])=>
			{
				//if(id === player.id)
				//	return;
				obj.emitAdd(socket); // send all others existing objects to client
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
			//.on('setAxisMovement', (data)=>
			//{
			//	try
			//	{
			//		this.entities[data.id].movement[data.axis] = Math.max(Math.min(data.value, 1), -1); // -1 >= movementValue =< 1
			//	}
			//	catch(e)
			//	{
			//		console.warn(e);		
			//	}
			//})
			.on('thrustingDirection', (data)=>
			{
				try
				{
					this.entities[data.id].thrusting[data.side] = data.value;
				}
				catch(e)
				{
					console.warn(e);
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
					console.warn(e);		
				}
			})
			.on('isShooting', (data)=>
			{
				try
				{
					this.entities[data.id]/*.weapon*/.shooting = Boolean(data.value);
				}
				catch(e)
				{
					console.warn(e);		
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
				// && (
				// 	change.path.includes('/centerX') || change.path.includes('/centerY') // send X and Y
				// 	|| change.path.includes('/lookAngle')
				// 	|| change.path.includes('/HP')
				// )
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
