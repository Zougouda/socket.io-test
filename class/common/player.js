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
		if(!domContainer)
			throw('no domContainer given in parameter');

		var myShip = this.getShip();
		if(!myShip)
			return;
		var clientState = myShip.getState();
		if(!clientState)
			return;

		/* Keyboard events */

		this.onKeyDown = (e)=>
		{
			/* Cancel default behaviour */
			switch(e.keyCode)
			{
				case 90:
				case 83:
				case 81:
				case 68:

				case 37:
				case 38:
				case 39:
				case 40:
					e.preventDefault();
				break;
			}
			switch(e.keyCode)
			{
				case 90: // Z
                case 38: // up
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'forward',
						value: 1,
					});
				break;
				case 83: // S
				case 40: // down
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'backward',
						value: 1,
					});
				break;
				case 81: // Q
				case 37: // left
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'left',
						value: 1,
					});
				break;
				case 68: // D
				case 39: //right
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'right',
						value: 1,
					});
				break;
			}
		};
		window.addEventListener("keydown", this.onKeyDown);

		this.onKeyUp = (e)=>
		{
			switch(e.keyCode)
			{
				case 90: // Z
				case 38: // up
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'forward',
						value: 0,
					});
				break;
				case 83: // S
				case 40: // down
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'backward',
						value: 0,
					});
				break;
				case 81: // Q
				case 37: // left
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'left',
						value: 0,
					});
				break;
				case 68: // D
				case 39: //right
					clientState.socket.emit('thrustingDirection', {
						id: myShip.id,
						side: 'right',
						value: 0,
					});
				break;
			}
		};
		window.addEventListener("keyup", this.onKeyUp);

		/* Mouse events */

		this.onMouseMove = (e)=>
		{
			var rect = domContainer.getBoundingClientRect();
			var x = (e.pageX - rect.left) * e.target.ratio,
				y = (e.pageY - rect.top) * e.target.ratio;

			clientState.socket.emit('setLookPointCoords', {
				id: myShip.id,
				x,
				y,
			});
		};
		domContainer.addEventListener('mousemove', this.onMouseMove);

		this.onMouseDown = (e)=>
		{
			if(e.which === 1) // left mouse button
				this.getShip().toggleWeapons([0]);
			else if(e.which === 3) // right mouse button
				this.getShip().toggleWeapons([1]);
		};
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
			this.giveControls( this.getState().canvas );
	}
}

module.exports = Player;
