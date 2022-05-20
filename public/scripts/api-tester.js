async function testCreate(){
	const config = new Object();
	config.method = "POST";
	config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
	config.body = JSON.stringify({'name': createName.value, 'email': createEmail.value, "password": createPassword.value});
	const response = await fetch("http://localhost:3000/register", config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
}


async function testRead(){
	const config = new Object();
	config.method = "GET";
	const response = await fetch(`http://localhost:3000/get/${readId.value}`, config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
}

async function testReadAll(){
	const config = new Object();
	config.method = "GET";
	const response = await fetch("http://localhost:3000/getuser", config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testUpdate(){
	const config = new Object();
	config.method = "PUT";
	config.headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
	config.body = JSON.stringify({'email': updateEmail.value, 'password': updatePassword.value});
	const response = await fetch(`http://localhost:3000/update/${updateId.value}`, config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
}

async function testDelete(){
	const config = new Object();
	config.method = "DELETE";
	const response = await fetch(`http://localhost:3000/delete/${deleteId.value}`, config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
}

async function Login(){
	const config = new Object();
	config.method = "POST";
	config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
	config.body = JSON.stringify({'email': loginId.value, 'password': loginPassword.value});
	const response = await fetch('http://localhost:3000/login', config);
	const data = await response.json();
	// sessionStorage.token = data.token;
	// document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
}

async function testAuth(){
	const config = { };
	config.method = "GET";
	config.headers = {"Authorization": 'Bearer ' + sessionStorage.getItem('token')};
	const response = await fetch("http://localhost:3000/special", config);
	const data = await response.json();
	document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}