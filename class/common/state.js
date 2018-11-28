module.exports = class State
{
	constructor(options = {})
	{
		this.jsonPatch = require('fast-json-patch');
		this.then = this.now = Date.now();

		this.players = {};
	}

	addPlayer(playerObj, id)
	{
		this.players[id] = playerObj;
		playerObj.playerID = id;
		return {id: id, obj: playerObj};
	}

	removePlayer(id)
	{
		delete this.players[id];
	}

	getSecondsSinceLastTick()
	{
		this.now = Date.now();
		var secondsElapsed = (this.now - this.then) / 1000;
		this.then = this.now;
		return secondsElapsed;
	}
};