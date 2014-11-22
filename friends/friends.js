var dbConnection = require('../databaseSetup.js');

//inserts a new friend request row
module.exports.requestFriend = function(req, res){
  var requestInfo = req.body;
  makeFriendRequest(req.body, res);
};

//checks if the user has received any friend requests.
module.exports.checkRequest = function(req, res){
  var userId = req.body.userId;
  //call database query and send response back
  checkFriendRequest(userId, res);
};

module.exports.confirmFriend = function(req, res){
  var requestInfo = req.body
  confirmFriendRequest(requestInfo, res);
};

module.exports.declineFriend = function(req, res){
  var requestInfo = req.body;
  declineFriendRequest(requestInfo, res);
};


// ===================HELPER FUNCTIONS=======================
var makeFriendRequest = function(requestInfo, res){
  var query = 'INSERT INTO friendrequests (requesterId, confirmerId) SELECT ?, userId FROM users WHERE username = ?';
  dbConnection.query(query, [requestInfo.requesterId, requestInfo.confirmerName], function(error, data){
    if (error){
      console.log(error);
      res.send(error);
    } else {
      res.send('Your friend request was successful');
    }
  })
}

var checkFriendRequest = function(userId, res){
  //var query = 'SELECT * FROM friendRequests WHERE confirmerId = ?';
  var query = 'SELECT users.username AS requesterName, friendRequests.requesterId FROM friendRequests INNER JOIN users ON users.userId = friendRequests.requesterId WHERE confirmerId = ?';
  dbConnection.query(query, userId, function(error, rows) {
    var data = { count: [] };
    if(error){
      res.send(error);
    }else{
      data.count = rows.length;
      data.friendRequesters = rows;
      res.send(data);
    }
  });
};

var confirmFriendRequest = function(requestInfo, res){
  var deleteQuery = 'DELETE FROM friendrequests WHERE requesterId = ? AND confirmerId = ?';
  var addQuery = 'INSERT INTO contacts (userId, friendId) VALUES (?, ?), (?, ?)';

  dbConnection.beginTransaction(function(err) {
    if (err) { 
      console.log(err);
    }
    //remove from friend requests
    dbConnection.query(deleteQuery, [requestInfo.requesterId, requestInfo.userId], function(error, data){
      if(error){
        dbConnection.rollback(function() {
          console.log(err, 'REMOVING FROM FRIENDS');
        });
      }
      //add to contacts
      var insertValues = [
        requestInfo.userId,
        requestInfo.requesterId,
        requestInfo.requesterId,
        requestInfo.userId
      ];
      dbConnection.query(addQuery, insertValues, function(err, data){
        if (err) { 
          dbConnection.rollback(function() {
            console.log(err, 'ADD TO CONTACTS');
          });
        }
        //commit the whole transaction
        dbConnection.commit(function(err) {
          if (err) { 
            mysql.rollback(function() {
              console.log(err, 'COMMIT');
            });
          } else {
            res.end();
          }
        });
      })
    })
  })

}

var declineFriendRequest = function(requestInfo, res){
  var query = 'DELETE FROM friendrequests WHERE requesterId = ? AND confirmerId = ?';
  dbConnection.query(query, [requestInfo.requesterId, requestInfo.userId], function(error, data){
    if(error){
      res.send(error);
    } else{
      console.log(data, 'RESPONSE FROM MYSQL');
      res.send({text: 'decline friend confirmed'});
    }
  })
}