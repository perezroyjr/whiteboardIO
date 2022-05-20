const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', loginPOST);

async function loginPOST(request, response){
	const userData = request.body;
	const user = await User.findOne( {email:userData.email} ).exec();
	if(!user){
		response.status(401).json( {msg:'Invalid email'} );
	}
	else if (user.password !== userData.password){
		response.status(401).json( {msg:'Invalid password'});
	}else{
		const payload = {subject:user._id};
		const token = jwt.sign(payload, 'secretKey');
		// response.status(200).send( {token} );
		response.redirect('/');
	}
}

router.use(express.static('public')); // use public for static files
router.get("/", getIndex);	 		   // Get endpoint for index.html

async function getIndex(request, response){	//callback function for request
	response.sendFile('../public/whiteboard.html', {root: __dirname }); //send index.html file
}


router.get("/getuser", getuserGET);

async function getuserGET(request, response){
	const documents = await User.find();
	const json = {status:200, msg:'Users data fetched', data: documents};
	response.json(json);
}


router.get("/get/:id", userGET);

async function userGET(request, response){
	const documents = await User.findById(request.params.id);
	if(documents){
		response.status(200).json(documents);
	}else{
		response.status(404).json({ msg: 'data not found' });
	}
}

router.put('/update/:id', updateuserPUT);

async function updateuserPUT(request, response){
	const user = {_id: request.params.id};
	const data = {email: request.body.email, password: request.body.password};
	const document = await User.updateOne(user, data);
	if(!document){
		return response.status(404).json({msg: 'data not found'});
	}
	return response.status(200).json(document);
}

router.post("/register", registerPOST);

async function registerPOST(request, response){
	const {name, email, password} = request.body;
	const newUser = new User({name: name, email: email, password: password});
	const document = await newUser.save();
	const json = {state: true, msg: "data inserted", document: document }
	response.json(json);
}

router.delete('/delete/:id', deleteuserDELETE);

async function deleteuserDELETE(request, response){
	const document = await User.deleteOne({ _id: request.params.id });
	const json = { status: 200, msg: 'User data deleted', document: document }
	response.json(json);
}

function verifyToken(request, response, next){
	if(!request.headers.authorization){
		return response.status(401).json({msg:'Unauthorized request'});
	}

	const token = request.headers.authorization.split(' ')[1];
	if(token == 'null'){
		return response.status(401).json({msg:'Unauthorized request'})
	}

	const payload = jwt.verify(token, 'secretKey');
	if(!payload){
		return response.status(401).json({msg:'Unauthorized request'});
	}
	request.userId = payload.subject;
	next();
}

router.get('/special', verifyToken, specialGET);

async function specialGET(request, response){
	const data = {user: request.userId};
	response.json(data);
}

module.exports = router;