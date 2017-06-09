
var mongoose = require('mongoose');

var autoIncrement=require('mongoose-auto-increment');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost/ggsfdb");

autoIncrement.initialize(connection);


//mongo schema for member collection
var memberSchema = new Schema(
{
	acctno:
	{
		type: Schema.Types.ObjectId, ref:'acctno'
	},
	
	fname:
	{
		type:String,
		required:true
	},
	mname:
	{
		type:String
	},
	lname:
	{
		type:String,
		required:true
	},
	address:
	{
		street:
		{
			type:String,
			required:true
		},
		aptno:
		{
			type:Number
		},
		city:
		{
			type:String,
			required:true
		},
		state:
		{
			type:String,
			required:true
		},
		country:
		{
			type:String,
			required:true
		},
		zipcode:
		{
			type:Number,
			required:true
		},

	},
	mobileno:
	{
		type:String
	},
	homephno:
	{
		type:String
	},
	email:
	{
		type:String,
		required:true
	}

/*
	donations:
	[
		{
			donationAmt:
			{
				type:Number,
				required:true
			},

			donationPurpose:
			{
				type:String
			},

			PymtType:
			{
				type:String,
				required:true
			},
			donationDate:
			{
				type:Date,
				default:Date.now,
				required:true
			}
		}
	]
	*/
});


// make member avaailable anywhere
var Member = module.exports = mongoose.model('Member', memberSchema);

//memberSchema.plugin(autoIncrement.plugin, 'Member');

memberSchema.plugin(autoIncrement.plugin, {model:'Member', field:'acctno'});

var Member = connection.model('Member', memberSchema);


// Get Members
module.exports.getMembers = function(callback, limit)
{
	Member.find(callback).limit(limit);
}

//Get Member by _id
module.exports.getMemberById = function(id, callback)
{
	Member.findById(id, callback);
}

// Add Member
module.exports.addMember = function(member, callback)
{
	Member.create(member, callback);

}

//update Member
module.exports.updateMember = function(id, member, options,  callback)
{

	var query = { _id: id};
	Member.isNew = false;
	var update = 
	{
		fname: member.fname,
		mname: member.mname,
		lname: member.lname,
		street: member.address.street,
		aptno: member.address.aptno,
		city: member.address.city,
		state: member.address.state,
		country: member.address.country,
		zipcode: member.address.zipcode,
		mobileno: member.mobileno,
		homephno: member.homephno,
		email: member.email
	};
	Member.findOneAndUpdate(query,update, options, callback);
}

//remove Member
module.exports.removeMember = function(id, callback)
{
	var query = { _id : id};
	Member.remove(query, callback);

}









