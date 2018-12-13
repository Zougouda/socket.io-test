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
			var myShip = this.getShip();
			var myAssignment = this.getAssignment();

			/* Assign every ship assignment controls to the player in charge */
			Object.entries(myShip.getMouseControlsByAssignment()[myAssignment])
			.concat( Object.entries(myShip.getKeyControlsByAssignment()[myAssignment]) )
			.forEach( ([event, callback])=>
			{
				this[event] = (e)=>
				{
					callback.apply(myShip, [e]);
				};
			} );

			this.giveControls( this.getState().canvas );
		}
	}
}

module.exports = Player;
