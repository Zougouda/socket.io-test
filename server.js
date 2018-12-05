const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const pug = require('pug');

const ServerState = require('./class/server/serverState.js');

const port = Number(process.env.PORT || 1234);

const app = express();
app.get('/', (req, res)=>
{
	res.send(
		pug.renderFile(
			__dirname + '/templates/index.pug'
		)
	);
})
.use(express.static(__dirname +'/public'));

var httpServer = http.createServer(app);
httpServer.listen(port);

const io = socketio(httpServer);

var serverState = new ServerState({io: io.of('/game')});

process.on('SIGINT', async function()
{
	serverState.io.emit('reset');
	process.exit();
});

console.log('ready');
