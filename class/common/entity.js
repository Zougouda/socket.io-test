module.exports = class Entity
{
    constructor(options = {})
    {
        this.options = options;
        this.applyOptions();
        this.init();
    }

    get defaultOptions()
    {
        return {
            id: null,

			addEvent: 'addEntity',
			removeEvent: 'removeEntity',
        };
    }

	onAdd()
	{
		return null; // to be overriden
	}

	onRemove()
	{
		return null; // to be overriden
	}

    addTo(state, socket)
    {
		if(state)
			this.getState = ()=>{return state;};
		if(socket)
			this.getSocket = ()=>{return socket};

		try
		{
			this.getState().addEntity(this);
		}
		catch(e)
		{
			console.warn(e);
		}

		this.emitAdd(true);

		this.onAdd();

        return this;
    }
	emitAdd(broadcast = false)
	{
		if(this.getSocket())
		{
			this.getSocket().emit(this.addEvent, {options: this, constructor: this.constructor.name}); // notify the client that this entity is gone
			if(broadcast)
				this.getSocket().broadcast.emit(this.addEvent, {options: this, constructor: this.constructor.name}); // notify every other client that this entity is gone
		}
	}
	remove()
	{
		if(this.getSocket())
		{
			this.getSocket().emit(this.removeEvent, this.id); // notify the client that this entity is gone
			this.getSocket().broadcast.emit(this.removeEvent, this.id); // notify every other client that this entity is gone
		}
		this.getState().removeEntity(this.id);

		this.onRemove();
	}

    getState()
    {
        return false; // to be overriden
    }
    getSocket()
    {
        return false; // to be overriden
    }

    applyOptions()
    {
        if(!this.options)
            return;
        
        Object.entries( this.defaultOptions )
        .forEach( ([key, defaultValue]) => 
        {
            if(this.options[key] === undefined)
                this[key] = defaultValue; // apply default value if doesnt exist
            else
                this[key] = this.options[key]; // or use given value
        });
    }

    init()
    {
        
    }
};
