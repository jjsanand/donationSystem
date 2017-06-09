
// use express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//access to front-end files
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Member = require('./models/member');

Counter = require('./models/counter');

// connect to Mongoose
mongoose.connect('mongodb://localhost/ggsfdb');

var db = mongoose.connection;

/*
var db;
function setDB()
{
	db = mongoose.connection;
}
*/


// root URL
app.get('/', function(rec,res)
{
	res.send("Welcome. Please use /api/members or /api/donations");

});


// view list of members
app.get('/api/members', function(rec, res)
{
	Member.getMembers(function(err,members)
	{
		if(err)
		{
			throw err;
		}
		res.json(members);

	});
});

//view a member by their unique _id
app.get('/api/members/:_id', function(rec,res) 
{
	Member.getMemberById(rec.params._id,function(err, member)
	{
		if(err)
		{
			throw err;
		}
		res.json(member);
	});

});

// add member
app.post('/api/members', function(rec, res)
{
	//setDB();
	//var newID = Counter.getNextSequence("memberid");
	var member = rec.body;
	Member.addMember(member,function(err,member)
	{
		if(err)
		{
			throw err;
		}
		res.json(member);
		
	});
});

// locate and update member using _id
app.put('/api/members/:_id', function(rec, res)
{
	var id = rec.params._id;
	var member = rec.body;
	Member.updateMember(id,member,{},function(err,member)
	{
		if(err)
		{
			throw err;
		}
		res.json(member);

	});
});

// remove member
app.delete('/api/members/:_id', function(rec, res)
{
	var id = rec.params._id;
	Member.removeMember(id,function(err,member)
	{
		if(err)
		{
			throw err;
		}
		res.json(member);

	});
});

//Generate next memberID

/*
function getNextSequence (seqName) 
{
	setDB();
   var ret = db.Counter.findAndModify(
   {
        query: { _id: seqName },
        update: { $inc: { seq: 1 } },
        new: true
    });
   return ret.seq;
}
*/




app.listen(3000);
console.log("Running on port 3000!");