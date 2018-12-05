module.exports = class State
{
	constructor(options = {})
	{
		this.jsonPatch = require('fast-json-patch');
		this.then = this.now = Date.now();

		this.debug = options.debug || false;

		this.entities = {};
	}

	addEntity(obj)
	{
		if(!obj.id)
			obj.id = Date.now();

		this.entities[obj.id] = obj;
	}

	removeEntity(id)
	{
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
