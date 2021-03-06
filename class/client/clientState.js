const commonClasses = require('../common/');
const clientClasses = require('../client/');

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

		this.playerID = null;

		this.initCanvas(); // setup canvas(es)
		this.tick(); // Start ticking 
		this.initSocket(); // Start listening from the server

	}

	initCanvas()
	{
		this.ctx = this.canvas.getContext('2d');

		var onResize = ()=>
		{
			commonClasses.Graphic.resizeCanvas({
				canvas: this.canvas,
				width: this.canvasWidth,
				height: this.canvasHeight,
			});
		};
		window.addEventListener('resize', onResize);
		onResize();
	}

	initSocket()
	{
		this.socket = this.io.connect('/game');

		this.socket
		.on('connect', ()=>
		{
			this.playerID = this.socket.io.engine.id;

			this.playerEntersTheGame();
		})
		.on('reset', ()=>
		{
			location.reload(); // reload the whole page
		})
		.on('removeEntity', (id)=>
		{
			if( this.entities[id] )
				this.entities[id].remove();
			if(this.isCurrentPlayer(id) )
			{
				setTimeout(()=>
				{
					alert("You're dead, bro.");
				}), 500;
			}
		})
		.on('addEntity', (data)=>
		{
			var constructorToUse = commonClasses[data.constructor];
			var options = data.options;

			var newEntity = new constructorToUse(options) // create the object based on the data sent from the server
			.addTo(this);
		})
		.on('updateEntities', (changes)=>
		{
			this.handlePatch(changes);
		})
		;
	}

	playerEntersTheGame()
	{
		this.playerName = window.prompt("What's your name ?", localStorage.getItem('playerName') || '');
		if(!!this.playerName)
		{
			/* player can join an existing ship with a get parameter */
			var urlParams = new URLSearchParams(window.location.search);
			var shipToPick = urlParams.get('ship') || null;
			var assignment = urlParams.get('assignment') || null;
			var shipIdToJoin = urlParams.get('shipID') || null;

			localStorage.setItem('playerName', this.playerName);
			this.socket.emit('newPlayerShip', {
				name: this.playerName, 
				shipToPick,
				shipID: shipIdToJoin,
				assignment,
			});
		}
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
		if( this.currentPlayer && this.currentPlayer.camera )
			this.currentPlayer.camera.update(secondsElapsed); // move the camera
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
		 	 this.logErr(e);
		 }
	}
}
