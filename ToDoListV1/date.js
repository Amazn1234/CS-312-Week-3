
exports.getDate = function() 
{

	const today = new Date();

	//create js options object
	const options = 
	{
		weekday: 'long',
		day: "numeric",
		month: "long"
	}
	//create day string with options
	return today.toLocaleDateString("en-US", options);

};

exports.getDay = getDay
var getDay = function()
{
	const today = new Date();

	const options = 
	{
		weekday: "long"
	};
	return today.toLocaleDateString("en-US", options);

};

//console.log(module.exports)