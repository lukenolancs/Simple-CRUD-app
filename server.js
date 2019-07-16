const express = require('express');
const app = express();

//Start Server Connection
var server = app.listen(3000, function() {
	console.log('listening on port 3000...');
})


app.get('/', (req, res) => {
	res.sendFile(__dirname +  '/index.html');
})


app.post('/names', (req,res) => {
	console.log('Woo!');
})