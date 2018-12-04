const commonClasses = require('../common/index.js');

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
		.on('newPlayer', (obj)=>
		{
			var newPlayerShip = new commonClasses.Ship(obj)
			.addTo(this, null);
			if(this.isCurrentPlayer(newPlayerShip.id) )
			{
				newPlayerShip.initKeyboardControl();
				newPlayerShip.initMouseControl(this.canvas);
			}
		})
		.on('removedPlayer', (playerID)=>
		{
			this.entities[playerID].remove();
			
		})
		.on('newProjectile', (obj)=>
		{
			var bullet = new commonClasses.Projectile(obj)
			.addTo(this);
		})
		.on('removeProjectile', (id)=>
		{
			this.entities[id].remove();
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

	tick()
	{
		var secondsElapsed = this.getSecondsSinceLastTick();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	Object.entries(this.entities).forEach( ([key, obj])=>
    	{
			obj.updateClient(secondsElapsed)
    	    obj.draw(this.ctx);
    	});
    	window.requestAnimationFrame(()=>
		{
			this.tick();
		});
	}

	handlePatch(changes)
	{
		Object.entries(this.entities).forEach( ([id, obj])=>
		{
			obj.storeLastPosition();
		} );
		this.jsonPatch.applyPatch(this.entities, changes);
	}
}
