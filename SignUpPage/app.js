//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
//create new express instance
const app = express()
//select port server will be avaliable on for local host
const port = 3000
//set server to listen at that port, and write log message
app.listen(process.env.PORT || port, function(){
	console.log("server started on port %d", port)
});

//use bodyparser as urlencoded method
app.use(bodyParser.urlencoded({extended: true}));

//specifices a static folder for express
//allows use of static files with express
app.use(express.static("public"));

app.get("/", function(req, res){

	//console.log(req);
	res.sendFile(__dirname + "/sign-up.html")
});

app.post("/", function(req, res){

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	//debugging to ensure bodyparser is working and data is being sent back to server
	//console.log(firstName + lastName + email);

	//create data as json format as described by mailchimp
	var data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields:{
					FNAME: firstName,
					LNAME: lastName
				}

			}
		]
	}
	//turn json data into string format
	var jsonData = JSON.stringify(data);

	//set mailchimp url to post to
	const listID = "0ce8f9b52a"
	const mailchimpUrl =  'https://us17.api.mailchimp.com/3.0/lists/' + listID

	//create js options
	const options = {
		method: "POST",
		//authentication username and password
		auth: "Amazn1:44776dd24c56821fd956e84e283d2cf8-us17"

	}
	const request = https.request(mailchimpUrl, options, function(response){
		response.on("data", function(data){
			console.log(JSON.parse(data));
		})
	
		if( response.statusCode === 200)
			{
				res.sendFile(__dirname + "/success.html")
			}
			else
			{
				res.sendFile(__dirname + "/failure.html")
			}
	})
	//sends data to mailchimp servers
	request.write(jsonData);
	request.end();



});

app.post("/failure", function(req, res){
	res.redirect("/")
})

//API KEY
//44776dd24c56821fd956e84e283d2cf8-us17

//audience/list ID
//0ce8f9b52a