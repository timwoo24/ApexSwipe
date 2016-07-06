var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server');
var db = require('../../server/db/config');
var Deck = require('../../server/db/models/deckModel');
var Friends = require('../../server/db/models/friendsModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');



describe('API', function() {
  
  describe('Deck API', function() {
    
    var deckId, cardId, userId;
    var clearDeckDB = function(done) {
      mongoose.connection.collections['decks'].remove(done);
    }
    
    beforeEach(function(done) {
      clearDeckDB(function() {
        var deck = {
          user_id: '22222',
          name: 'Dresses',
          deck: [ 
            {
              name: 'Dress 1',
              imageUrl: 'http://www.example.com/3',
              likes: 0
            }
          ],
          shared: [ 
            {
              user_id: '33333',
              swiped: true
            }
          ]
        };
        Deck.create(deck, function(err, deck) {
          deckId = deck._id;
          cardId = deck.deck[0]._id;
          userId = deck.shared[0]._id;
          done();
        });
      })
    });
    
    it('it should add a new deck and send it back', function(done) {
      request(app)
        .post('/decks')
        .send({
          user_id: '11111',
          name: 'Suits',
          deck: [ 
            {
              name: 'Suit 1',
              imageUrl: 'http://www.example.com/1',
              likes: 0
            }
          ],
          shared: [ 
            {
              user_id: '22222',
              swiped: true,
            }
          ]
        })
        .expect(201)
        .end(done);
    });
    
    it('should return all the user\'s decks', function(done) {
      request(app)
        .get('/decks/22222')
        .expect(200)
        .expect(function(res) {
          expect(res.body[0].name).to.equal('Dresses');
          expect(res.body.length).to.equal(1);
        })
        .end(done);
    });   
    
    it('should return all the decks shared with the user', function(done) {
      request(app)
        .get('/decks/shared/33333')
        .expect(200)
        .expect(function(res) {
          expect(res.body[0].name).to.equal('Dresses');
          expect(res.body.length).to.equal(1);
        })
        .end(done);
    });
    
    it('should update the "like" count for a particular card of a particular deck and return that deck', function(done) {
      request(app)
        .put('/decks/' + deckId)
        .send({
          cardId: cardId
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body.deck[0].likes).to.equal(1);
        })
        .end(done);
    });
    
    it('should update a user\'s status as to when the user swiped through a shared deck' , function(done) {
      request(app)
        .put('/decks/shared/' + deckId)
        .send({
          userId: userId
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body.shared[0].swiped).to.equal(true);
        })
        .end(done);
    });
    
    it('should delete a specified deck', function(done) {
      request(app)
        .del('/decks/' + deckId)
        .send({
          user_id: '22222'
        })
        .expect(200)
        .expect(function(res) {
          Deck.find({}).exec(function(err, decks) {
            expect(decks.length).to.equal(0);
          })
        })
        .end(done);
    });
  })
  
  describe('Friends API', function() {
    
    var clearFriendsDB = function(done) {
      mongoose.connection.collections['friends'].remove(done);
    }
    var friendId;
    
    beforeEach(function(done) {
      clearFriendsDB(function() {
        var user = {
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
        };
        Friends.create(user, function(err, user) {
          friendId = user.list[0]._id;
          done();
        });
      })
    });

    it('should return an array of all the user\'s friends', function(done) {
      request(app)
        .get('/users/friends/11111')
        .expect(200)
        .expect(function(res) {
          expect(res.body.length).to.equal(2);
          expect(res.body[1].picture).to.equal('https://gravator3.example.com');
        })
        .end(done);
    })
    
    it('should add a friend object to the user\'s friends list and return the user\'s friends list', function(done) {
      request(app)
        .post('/users/friends/11111')
        .send({
          user_id: '44444',
          email: 'fournull@fourmail.com',
          picture: 'https://gravator4.example.com'  
        })
        .expect(201)
        .expect(function(res) {
          expect(res.body.length).to.equal(3);
          expect(res.body[2].picture).to.equal('https://gravator4.example.com');
        })
        .end(done);
    })
    
    it('should remove a friend from a user\'s friends list', function(done) {
      request(app)
        .del('/users/friends/11111')
        .send({
          friend_id: friendId
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body.length).to.equal(1);
        })
        .end(done);
    })

  })
})

















