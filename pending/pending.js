var dbConnection = require('../databaseSetup.js');

module.exports.getPending = function(req, res){
  var userId = req.body.userId;
  //get contentId from receivers table with userId;
  //get contents data from contents table with contentId;
  //get pictureData from pictures table with pictureId;
  //get username from users table with userId;
  getPendingConents(userId, res);
};

module.exports.sendVote = function(req, res){
	var userId = req.body.userId;
	var contentId = req.body.contentId;
	var vote = req.body.vote;

	//look up the contents table with the contentId 
	// if the vote is 1, store 1 in yes, if the vote is -1, store 1 in no
	vote === 1 && saveYes(contentId, res);
	vote === -1 && saveNo(contentId, res);

	//delete connection in receivers table
  deleteFromReceivers(userId, contentId);
};

// ===================HELPER FUNCTIONS=======================

var getPendingConents = function(userId, res){
  dbConnection.query("SELECT p.pictureData, c.topic, u.username, c.contentId FROM receivers r JOIN contents c on r.contentID = c. contentID join pictures p on c.pictureID = p.pictureID join users u on c.userId = u.userId WHERE receiversId = '" + userId + "';", function(error, rows) {
    var data = { contents: [] };
    if(error){
    	res.send(error);
    }else{
    	data.contents = rows;
    	res.send(data);
    }
  });
};

var saveYes = function(contentId, res){
  dbConnection.query("UPDATE contents SET yes = yes+1 WHERE contentId = '" + contentId +"';", function(error) {
    if(error){	res.send(error); }
  });
};

var saveNo = function(contentId, res){
  dbConnection.query("UPDATE contents SET no = no+1 WHERE contentId = '" + contentId +"';", function(error) {
    if(error){	response.send(error); }
  });
};

var deleteFromReceivers = function(userId, contentId){
	dbConnection.query("DELETE FROM receivers WHERE receiversId = '" + userId + "' and contentId = '" + contentId + "';", function(error) {
	  if(error){ console.error(error); }
	});
};	
