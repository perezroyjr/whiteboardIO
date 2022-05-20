const express = require('express');
const app = express();
const port = process.env.port || 3000;

const { database } = require('./config/database');
const mongoose = require('mongoose');

const mongoose_config = {useNewUrlParser: true, useUnifiedTopology: true};
const connection = mongoose.connect(database, mongoose_config);

if(connection){
	console.log('database connected');
}else{
	console.log('database connection error');
}

const bodyParser = require('body-parser');
const userRoutes = require('./api/user-routes');

app.use(bodyParser.json());
app.use('/', userRoutes);


app.use(express.static('public')); // use public for static files
app.get("/", getIndex);		   // Get endpoint for index.html


app.listen(port, () => console.log("Server is running on ", port));

function getIndex(request, response){	//callback function for request
	response.sendFile('./public/whiteboard.html', {root: __dirname }); //send index.html file
}
