const Movable = require('../common/movable.js');

module.exports = class ServerState extends require('../common/state.js')
{
	constructor(options = {})
	{
		super(options);

		this.frequency = 1000 / 60; // 60FPS

		var {io = null} = options;
		this.io = io;
		if(!io)
			throw('Missing mandatory option in ServerState instance !');

		this.observer = this.jsonPatch.observe(this.players);
		this.initSocket();
		this.initLoop();
	}

	initSocket()
	{
		this.io.on('connection', (socket)=>
		{
			var clientID = socket.client.id;
			var newPlayerData = this.addPlayer(new Movable(), clientID); // {id, json}

			socket.broadcast.emit('newPlayer', newPlayerData); // send New player to every other client
			Object.entries(this.players).forEach( ([id, obj])=>
			{
				socket.emit('newPlayer', {id, obj}); // send all existing players to client
			});

			socket
			.on('disconnect', ()=>
			{
				this.removePlayer(clientID);
				socket.broadcast.emit('removedPlayer', clientID); // notify every other client that this client is gone
			})
			.on('setAxisMovement', (data)=>
			{
				this.players[data.id].movement[data.axis] = data.value; // TODO never trust user input
			})
			;
		});
	}

    tick(modifier)
    {
    	Object.entries(this.players).forEach( ([key, obj])=>
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
				&& !change.path.includes('/movement/') // disable movement updates
			);
		});
		this.io.emit('updatePlayers', changes);
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
