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
		.on('reset', ()=>
		{
			location.reload(); // reload the whole page
		})
		.on('connect', ()=>
		{
			this.playerID = this.socket.io.engine.id;
		})
		.on('removeEntity', (id)=>
		{
			if( this.entities[id] )
				this.entities[id].remove();
			if(this.isCurrentPlayer(id) )
			{
				/* reload after a friendly message */
				alert("You're dead, bro.");
			}
		})
		.on('addEntity', (data)=>
		{
			var constructorToUse = commonClasses[data.constructor];
			var options = data.options;

			var newEntity = new constructorToUse(options) // create the object based on the data sent from the server
			.addTo(this);
		})
		//.on('addShip', (obj)=>
		//{
		//	var newPlayerShip = new commonClasses.Ship(obj)
		//	.addTo(this);
		//})
		//.on('addProjectile', (obj)=>
		//{
		//	var bullet = new commonClasses.Projectile(obj)
		//	.addTo(this);
		//})
		.on('updateEntities', (changes)=>
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
		try
		{
			this.jsonPatch.applyPatch(this.entities, changes);
		}
		catch(e)
		{
			 if(this.debug && console.warn)
			 	console.warn(e);
		}
	}
}
