module.exports = class ClientState extends require('../common/state.js')
{
	constructor(options = {})
	{
		super(options);
		var { canvas = null, io = null } = options;
		if(!canvas || !io)
			throw('Missing mandatory option in ClientState instance !');

		this.io = io;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');

		this.playerID = null;

		this.initSocket(); // Start listening from the server
		this.tick(); // Start ticking 
	}

	initSocket()
	{
		this.socket = this.io.connect('/game');

		this.socket
		.on('connect', ()=>
		{
			this.playerID = this.socket.io.engine.id;
		})
		.on('newPlayer', (data)=>
		{
			var {id, obj} = data;
			this.addPlayer(new Movable(obj), id);
		})
		.on('removedPlayer', (playerID)=>
		{
			this.removePlayer(playerID);
		})
		.on('updatePlayers', (changes)=>
		{
			this.handlePatch(changes);
		})
		;
	}

	isCurrentPlayer(id)
	{
    	return (id === this.playerID);
	}

	addPlayer(playerObj, id)
	{
		super.addPlayer(...arguments);
		if(this.isCurrentPlayer(id) )
			playerObj.initKeyboardControl();
	}

	removePlayer(id)
	{
		super.removePlayer(...arguments);
	}

	tick()
	{
		var secondsElapsed = this.getSecondsSinceLastTick();
    	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	Object.entries(this.players).forEach( ([key, obj])=>
    	{
			obj.update(secondsElapsed);
    	    obj.draw(this.ctx);
    	});
    	window.requestAnimationFrame(()=>
		{
			this.tick();
		});
	}

	handlePatch(changes)
	{
		changes = this.excludePatchForCurrentPlayer(changes);
		this.jsonPatch.applyPatch(this.players, changes);
	}

	excludePatchForCurrentPlayer(changes)
	{
		if(typeof this.updatePlayersIndex === 'undefined')
			this.updatePlayersIndex = 0;

		/* Only update player attributes based on the server each ~1s */
		if( this.updatePlayersIndex >= 60 )
			this.updatePlayersIndex = 0;
		else
		{
			changes = changes.filter( (change)=>
			{
				var changePlayerID = change.path.split('/')[1];
				return !this.isCurrentPlayer(changePlayerID);
			});
			this.updatePlayersIndex++;		
		}
		return changes;
	}
}
