const Player = require('./player.js');

module.exports = class State
{
	constructor(options = {})
	{
		this.jsonPatch = require('fast-json-patch');
		this.then = this.now = Date.now();

		this.debug = options.debug || false;

		this.players = {};
		this.entities = {};
		this.groups = {};

		this.canvasWidth = 1024; 
		this.canvasHeight = 768;
	}

	addEntity(obj)
	{
		if(!obj.id)
			obj.id = `${Date.now()}-${Math.ceil(Math.random()*100)}`; // random uniq-ish id

		/* Handle player case  */
		if(obj instanceof Player)
		{
			this.players[obj.id] = obj;
			return;
		}

		this.entities[obj.id] = obj;

		if(obj.groups)
		{
			obj.groups.forEach((groupName)=>
			{
				if(!this.groups[groupName])
					this.groups[groupName] = {};
				this.groups[groupName][obj.id] = obj;
			});
		}
	}

	removeEntity(id)
	{
		/* Handle player case  */
		if(this.players[id])
		{
			delete this.players[id];
			return;
		}

		if(!this.entities[id])
			return;

		if(this.entities[id].groups)
		{
			this.entities[id].groups.forEach((groupName)=>
			{
				delete this.groups[groupName][id];
			});
		}

		delete this.entities[id];
	}

	getSecondsSinceLastTick()
	{
		this.now = Date.now();
		var secondsElapsed = (this.now - this.then) / 1000;
		this.then = this.now;
		return secondsElapsed;
	}
};
