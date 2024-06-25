const express = require("express");
const bodyParser = require("body-parser");
//import local date module
const date = require(__dirname + "/date.js");

//create new express instance
const app = express();

//select port for local host
const port = 3000;

//require use of ejs
app.set('view engine', 'ejs');

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//tell express the location of static files
app.use(express.static("public"));

//create new global array var to beat scope
var items = [];
let workItems = [];

//set server to listen at that port and write a message in the logs
app.listen(port, function(){
	console.log("server started on port %d", port)
})

//send "hello" when client requests root
app.get("/", function(req, res){

	//use date module created
	let day = date.getDate();

	//send variables to be rendered
	res.render('list', {listTitle: day, newListItems: items});
	
})

//create get request for /work for a work todo list
app.get("/work", function(req, res){
	res.render("list", {listTitle: "Work List", newListItems: workItems});
})

//create a post request for the /work todo list
app.post("/work", function(req, res){
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work")
})


//handle post request to add a new item to toDo list
app.post("/", function(req, res){
	//use body parser to log new value
	//console.log(item);

	//create new item variable for each specific item to be added
	let item = req.body.newItem;

	//ensure item being added is not empty
	if(item !== "")
		{
		//determine if item being added is being added to work or default list
		if( req.body.list === "Work")
			{
				workItems.push(item);
				res.redirect("/work");
			}
			else
			{
				//push item to normal items list
				items.push(item);

				//redirect to home
				res.redirect("/");
			}
		}

})

//answers get requests for the "/about" directory
app.get("/about", function(req, res){
	res.render("about");
})