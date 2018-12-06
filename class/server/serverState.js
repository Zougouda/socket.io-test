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

			var newPlayerShip = new commonClasses.Ship({id: clientID})
			.addTo(this, socket);

			Object.entries(this.entities).forEach( ([id, obj])=>
			{
				obj.emitAdd(false); // send all others existing objects to client
			});

			socket
			.on('disconnect', ()=>
			{
				newPlayerShip.remove();
			})
			.on('setAxisMovement', (data)=>
			{
				try
				{
					this.entities[data.id].movement[data.axis] = data.value; // TODO never trust user input
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
					this.entities[data.id].weapon.shooting = Boolean(data.value);
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
				&& (
					change.path.includes('/centerX') || change.path.includes('/centerY') // send X and Y
					|| change.path.includes('/lookAngle')
					//|| change.path.includes('/lookPointCoords') // send look coords
				)
			);
		});
		setTimeout(()=>
		{
			this.io.emit('updateEntities', changes);
		}, this.latency);
		
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
