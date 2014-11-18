var dbConnection = require('../databaseSetup.js');

module.exports.getPending = function(req, res){
  var userId = req.body.userId;
  //get contentId from receivers table with userId;
  //get contents data from contents table with contentId;
  //get pictureData from pictures table with pictureId;
  //get username from users table with userId;
  getPendingContents(userId, res);
};

module.exports.countPending = function(req, res){
  var userId = req.body.userId;
  countPendingContents(userId, res);
}

module.exports.sendVote = function(req, res){
  var userId = req.body.userId;
  var contentId = req.body.contentId;
  var vote = req.body.vote;

  //look up the contents table with the contentId 
  // if the vote is 1, store 1 in yes, if the vote is -1, store 1 in no, if no, end the response
  if(vote === 1){
    saveYes(contentId, res);
  }
  if(vote === -1){
    saveNo(contentId, res);
  }
  if(vote === 0){
    res.end();
  }

  //delete connection in receivers table
  deleteFromReceivers(userId, contentId);
};

// ===================HELPER FUNCTIONS=======================

var getPendingContents = function(userId, res){
  dbConnection.query("SELECT p.data, c.topic, u.username, c.contentId FROM receivers r JOIN contents c on r.contentID = c. contentID join pictures p on c.pictureID = p.pictureID join users u on c.userId = u.userId WHERE receiversId = '" + userId + "';", function(error, rows) {
  var data = { contents: [] };
    if(error){
      res.send(error);
    }else{
      data.contents = rows;
      res.send(data);
    }
  });
};

var countPendingContents = function(userId, res){
  dbConnection.query("SELECT contentId FROM receivers WHERE receiversId = '" + userId + "';", function(error, rows) {
  var data = { count: 0 };
    if(error){
      res.send(error);
    }else{
      data.count = rows.length;
      console.log(data)
      res.send(data);
    }
  });
};

var saveYes = function(contentId, res){
  console.log('receive yes on ' + contentId );
  dbConnection.query("UPDATE contents SET yes = yes+1 WHERE contentId = '" + contentId +"';", function(error) {
    if(error){ res.send(error); }
  });
  res.end();
};

var saveNo = function(contentId, res){
  console.log('receive no on ' + contentId );
  dbConnection.query("UPDATE contents SET no = no+1 WHERE contentId = '" + contentId +"';", function(error) {
    if(error){ res.send(error); }
  });
  res.end();
};

var deleteFromReceivers = function(userId, contentId){
  console.log('deleteing content:' + contentId + ' from the table');
  dbConnection.query("DELETE FROM receivers WHERE receiversId = '" + userId + "' and contentId = '" + contentId + "';", function(error) {
    if(error){ console.error(error); }
  });
};  
