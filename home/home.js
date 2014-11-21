var dbConnection = require('../databaseSetup.js');


//checks if the user has received any friend requests and any contents to vote.
module.exports.checkUpdates = function(req, res){

  //take the userId information from the request.
  var userId = req.body.userId;

  //prepare the data object to send back with the properties.
  var data = {
    friendRequestCount: undefined,
    pendingCount: undefined
  };

  //define the mysql query to use
  var countFriendRequestQuery = "SELECT * FROM friendRequests WHERE confirmerId = ?";
  var countPendingQuery = "SELECT contentId FROM receivers WHERE receiversId = ?";

  //first, check friendRequests database to check if there is any friend requests 
  dbConnection.query(countFriendRequestQuery, userId, function(error, rows){
    if(error){
      res.send(error);
    }else{
      //store the number of the requests in the data object
      data.friendRequestCount = rows.length;
      //second, check receivers datbase to check if there is any pending contents
      dbConnection.query(countPendingQuery, userId, function(error, rows){
        if(error){
          //if there is any error, send back the friend request count at least.
          res.send(data);
        }else{
          //store the number of the pending contents in the data object
          data.pendingCount = rows.length;
          //send back the data to client
          res.send(data);
        }
      });
    }
  });
  
};