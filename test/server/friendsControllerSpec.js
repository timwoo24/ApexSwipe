var expect = require('chai').expect;
var mongoose = require('mongoose');
var Friends = require('../../server/db/models/friendsModel');
var friendsController = require('../../server/db/controllers/friendsController');
mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/apexdecks';

var clearDB = function(done) {
  mongoose.connection.collections['friends'].remove(done);
}

describe('Friends Controller', function() {
  
  before(function(done) {
    if(mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });
  
  // after(function(done) {
  //   mongoose.disconnect(function() {
  //     console.log('Mongodb connection closed');
  //     done();
  //   });
  // });
  
  afterEach(function(done) {
    clearDB(done);
  })
  
  beforeEach(function(done) {
    clearDB(function() {
      var friends = [
        {
          user_id: '11111',
          list: [ 
            {
              user_id: '22222',
              email: 'twonull@twomail.com',
              picture: 'https://gravator2.example.com'
            }, 
            {
              user_id: '33333',
              email: 'threenull@threemail.com',
              picture: 'https://gravator3.example.com'
            }
          ]
        }
      ];
      Friends.create(friends, done);
    })
  });
  
  it('should have a method that retrieves all of a user\'s friends', function(done) {
    var user_id = '11111';
    
    friendsController.getFriends(user_id, function(err, friendsList) {
      expect(friendsList.length).to.equal(2);
      expect(friendsList[0].email).to.equal('twonull@twomail.com');
      done();
    });
  });
  
  it('should have a method that removes a friend from the user\'s friends list', function(done) {
    var user_id = '11111';
    Friends.findOne({user_id: user_id})
      .exec(function(err, user) {
        var friendId = user.list[0]._id;
        friendsController.removeFriend(user_id, friendId, function(err, friendsList) {
          expect(friendsList.length).to.equal(1);
          expect(friendsList[0].email).to.equal('threenull@threemail.com');
          done();
        });
      })
  });
  
  describe('Add Friend', function() {
    var user_id = '11111';
    var friend = {
      user_id: '44444',
      email: 'fournull@fourmail.com',
      picture: 'https://gravator4.example.com'
    }
    
    it('should have a method that adds a friend to a user\'s friends list', function(done) {
      friendsController.addFriend(user_id, friend, function(err, friendsList) {
        expect(friendsList.length).to.equal(3);
        expect(friendsList[2].email).to.equal('fournull@fourmail.com');
        done();
      });
    });
    
    it('should not add a friend that already exists in a user\'s friends list', function(done) {
      friendsController.addFriend(user_id, friend, function(err, friendsList) {
        expect(friendsList.length).to.equal(3);
        expect(friendsList[3]).to.equal(undefined);
        done();
      });
    });
    
  })
  
  
});