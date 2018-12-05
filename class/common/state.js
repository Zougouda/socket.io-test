module.exports = class State
{
	constructor(options = {})
	{
		this.jsonPatch = require('fast-json-patch');
		this.then = this.now = Date.now();

		this.debug = options.debug || false;

		this.entities = {};

		// this.players = {};
		// this.projectiles = {};
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

	// addEntity(options = {})
	// {
	// 	var {
	// 		obj = null,
	// 		id = null,
	// 	} = options;

	// 	this.entities[id] = obj;
	// 	if(id)
	// 		obj.id = id;
	// }

	// addPlayer(playerObj, id)
	// {
	// 	this.players[id] = playerObj;
	// 	playerObj.playerID = id;
	// 	return {id, obj: playerObj};
	// }

	// removePlayer(id)
	// {
	// 	delete this.players[id];
	// }

	// addProjectile(obj, id)
	// {
	// 	this.projectiles[id] = obj;
	// 	obj.playerID = id;
	// 	return {id, obj: obj};
	// }

	// removeProjectile()
	// {
	// 	delete this.players[id];
	// }

	getSecondsSinceLastTick()
	{
		this.now = Date.now();
		var secondsElapsed = (this.now - this.then) / 1000;
		this.then = this.now;
		return secondsElapsed;
	}
};
