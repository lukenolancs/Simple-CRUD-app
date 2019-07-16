const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const MONGOURL = 'mongodb+srv://lukenolan:root@usernames-2fxhx.mongodb.net/usernames?retryWrites=true&w=majority';


var server = null;
var db = null;

//Establish DB connection and start app
MongoClient.connect(MONGOURL, (err, client) => {
	
	if (err) {
		return console.error(err);
	}
	db = client.db('usernames');

	server = app.listen(3000, function() {
		console.log('listening on port 3000...');
	})

})


//Allow the use of the body parser
app.use(bodyParser.urlencoded({extended: true}));


//Get the homepage at route / (index.html)
app.get('/', (req, res) => {

	var cursor = db.collection('quotes').find().toArray(function(err, res) {
		console.log(res);
	})
	

	res.sendFile(__dirname +  '/index.html');
})


//Saves input fields into MongoDB database
app.post('/names', (req,res) => {
	console.log(req.body);
	db.collection('firstAndLastName').save(req.body, (err, result) => {
		if (err) {
			return console.error(err);
		}

		console.log('successfully saved to database')
		res.redirect('/')
	});
});