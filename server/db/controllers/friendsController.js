var mongoose = require('mongoose');
var db = require('../config');
var Friends = require('../models/friendsModel');
var _ = require('underscore');
mongoose.Promise = require('bluebird');


module.exports = {
  
  getFriends: function(user_id, callback) {
   
    Friends.findOne({user_id: user_id}, function(err, user) {
      if(err) {
        callback(err);
      } else if (!user) {
        var newList = {
          user_id: user_id,
          list: []
        }
        new Friends(newList).save(function(err, user) {
          if(err) {
            callback(err);
          } else {
            callback(null, user.list);
          }
        })
      } else {
        callback(null, user.list);
      }
    });
  },
  
  addFriend: function(user_id, friend, callback) {
    var friendUserId = friend.user_id;
    
    Friends.findOne({user_id: user_id}, function(err, user) {
      if(err) {
        callback(err);
      } else if (!user) {
        var newList = {
          user_id: user_id,
          list: [friend]
        }
        new Friends(newList).save(function(err, user) {
          if(err) {
            callback(err);
          } else {
            callback(null, user.list);
          }
        })
      } else {
        var exists = _.find(user.list, function(friend) {
          return friend.user_id === friendUserId;
        });
        if(exists === undefined) {
          user.list.push(friend);
          user.save(function(err, user) {
            callback(null, user.list);
          })
        } else {
          callback(null, user.list)
        }
      }
    });
  },
  
  removeFriend: function(user_id, friendId, callback) {
    
    Friends.findOne({user_id: user_id}, function(err, user) {
      if(err) {
        callback(err);
        return;
      }
      
      user.list.id(friendId).remove();
      user.save(function(err) {
        if(err) {
          callback(err)
        } else {
          callback(null, user.list);
        }
      });
    })
  }
}
