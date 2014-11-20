var dbConnection = require('../databaseSetup.js');

//checks if the user has received any friend requests.
module.exports.checkRequest = function(req, res){
  var userId = req.body.userId;
  //call database query and send response back
  checkFriendRequest(userId, res);
};

module.exports.addFriend = function(req, res){

};

module.exports.confirmFriend = function(req, res){

};

// ===================HELPER FUNCTIONS=======================

var checkFriendRequest = function(userId, res){
  dbConnection.query("SELECT * FROM friendRequests WHERE confirmerId = '" + userId + "';", function(error, rows) {
  var data = { count: [] };
    if(error){
      res.send(error);
    }else{
      data.count = rows.length;
      res.send(data);
    }
  });
};