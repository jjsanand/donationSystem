


var mongoose = require('mongoose');



//mongo schema for member collection
var acctSchema = mongoose.Schema(
{
	memberid:
	{
		type:String,
		required:true
	},
	seq:
	{
		type:Number,
		required:true
	}

});

// make acctNo global
var memberid = module.exports = mongoose.model('memberid', acctSchema);


// get next sequece number
module.exports.getNextSequence = function(seqName) 
{
	db = mongoose.connection;
   var ret = db.counter.findAndModify(
   {
        query: { _id: seqName },
        update: { $inc: { seq: 1 } },
        new: true
    });
   return ret.seq;
}

