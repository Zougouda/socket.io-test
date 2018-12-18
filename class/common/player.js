class Player extends require('./entity.js')
{
	get defaultOptions()
	{
		return Object.assign(super.defaultOptions, {
			name: '',
			shipID: null,
		});
	}

	getShip()
	{
		if(!this.shipID)
			return null;
		return this.getState().entities[this.shipID];
	}

	getAssignment()
	{
		var result = null;
		var ship = this.getShip();
		if(ship)
		{
			Object.entries(ship.playerCrew).forEach( ([assignment, playerID])=>
			{
				if( playerID === this.id )
					result = assignment;
			} );		
		}
		return result;
	}

    /********** CLIENT FUNCTIONS **********/

	giveControls(domContainer)
	{
		var domContainer = this.getState().canvas;

		var myShip = this.getShip();
		if(!myShip)
			return;
		var clientState = myShip.getState();
		if(!clientState)
			return;

		/* Keyboard events */

		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);

		/* Mouse events */

		domContainer.addEventListener('mousemove', this.onMouseMove);
		domContainer.addEventListener('mousedown', this.onMouseDown);
		domContainer.addEventListener('mouseup', this.onMouseUp || this.onMouseDown);

		/* disable default right click context menu */
		domContainer.addEventListener('contextmenu', (e)=>
		{
			e.preventDefault();
		});
	}

	onAdd()
	{
		if( typeof window !== 'undefined' && this.getState().isCurrentPlayer(this.id) )
		{
			this.getState().currentPlayer = this;

			var myShip = this.getShip();
			if(!myShip)
				return;
			console.log(myShip.id);
			var myAssignment = this.getAssignment();

			/* Assign every ship assignment controls to the player in charge */
			Object.entries(myShip.mouseControlsByAssignment[myAssignment] || [] )
			.concat( Object.entries(myShip.keyControlsByAssignment[myAssignment] || []) )
			.forEach( ([event, obj])=>
			{
				if(!obj.callback)
					return;

				this[event] = (e)=>
				{
					commonClasses.Control[obj.callback]
					.apply(this, [e, obj.params]);
				};
			} );

			this.giveControls( this.getState().canvas );

			/* Attach the camera to the ship */
			this.camera = new clientClasses.Camera();
			this.camera.attachTo(myShip);
		}
	}
}

module.exports = Player;
