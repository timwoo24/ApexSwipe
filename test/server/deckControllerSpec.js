var expect = require('chai').expect;
var mongoose = require('mongoose');
var Deck = require('../../server/db/models/deckModel');
var deckController = require('../../server/db/controllers/deckController');
mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/apexdecks';

var clearDB = function(done) {
  mongoose.connection.collections['decks'].remove(done);
}

describe('Deck Controller', function() {
  
  before(function(done) {
    if(mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });
  
  afterEach(function(done) {
    clearDB(done);
  });
  
  beforeEach(function(done) {
    clearDB(function() {
      var decks = [
        {
          user_id: '11111',
          name: 'Suits',
          deck: [ 
            {
              name: 'Suit 1',
              imageUrl: 'http://www.example.com/1',
              likes: 1
            }, 
            {
              name: 'Suit 2',
              imageUrl: 'http://www.example.com/2',
              likes: 0
            }
          ],
          shared: [ 
            {
              user_id: '22222',
              swiped: true,
            }, 
            {
              user_id: '33333',
              swiped: true,
            }
          ]
        },
        {
          user_id: '22222',
          name: 'Dresses',
          deck: [ 
            {
              name: 'Dress 1',
              imageUrl: 'http://www.example.com/3',
              likes: 1
            }, 
            {
              name: 'Dress 2',
              imageUrl: 'http://www.example.com/4',
              likes: 0
            }
          ],
          shared: [ 
            {
              user_id: '33333',
              swiped: true
            }
          ]
        }
      ];
      
      Deck.create(decks, done);
    })
  });
  
  it('should have a method that retrieves all the decks created by a user', function(done) {
    var user_id = '11111';
    deckController.getAll(user_id, function(err, decks) {
      if(err) {
        console.log(err);
      };
      expect(decks.length).to.equal(1);
      expect(decks[0].name).to.equal('Suits');
      done();
    })
  });
  
  it('should have a method that retrieves all the decks that is shared with a user', function(done) {
    var user_id = '33333';
    deckController.getShared(user_id, function(err, decks) {
      if(err) {
        console.log(err);
      };
      expect(decks.length).to.equal(2);
      done();
    })
  });
  
  it('should have a method that adds a new deck', function(done) {
    var newDeck = {
      user_id: '33333',
      name: 'Wigs',
      deck: [ 
        {
          name: 'Wig 1',
          imageUrl: 'http://www.example.com/5',
          likes: 0
        }, 
        {
          name: 'Wig 2',
          imageUrl: 'http://www.example.com/6',
          likes: 0
        }
      ],
      shared: [ 
        {
          user_id: '11111',
          swiped: false
        }
      ]
    };
    
    deckController.addDeck(newDeck, function(err, deck) {
      if(err) {
        console.log(err);
      };
      Deck.find({})
        .exec(function(err, decks) {
          if(err) {
            console.log(err);
          } else {
            expect(decks.length).to.equal(3);
            done();
          }
        })
    })
  });
  
  it('should have a method that increments the "like" count for a particular card of a deck', function(done) {
    var user_id = '11111';
    Deck.find({user_id: user_id})
      .exec(function(err, decks) {
        if(err) {
          console.log(err);
        } else {
          var deckId = decks[0]._id;
          var cardId = decks[0].deck[0]._id;
          deckController.updateOneCard(deckId, cardId, function(err, deck) {
            if(err) {
              console.log(err);
            };
            expect(deck.deck[0].likes).to.equal(2);
            done();
          })
        }
      })
  });
  
  it('should have a method that deletes a deck', function(done) {
    var user_id = '11111';
    Deck.find({user_id: user_id})
      .exec(function(err, decks) {
        if(err) {
          console.log(err);
        } else {
          var deckId = decks[0]._id;
          deckController.deleteOneDeck(deckId, user_id, function(err, deck) {
            if(err) {
              console.log(err);
            };
            Deck.findById(deckId, function(err, result) {
              if(err) {
                console.log(err);
              } else {
                expect(result).to.equal(null);
                done();
              }
            });
          });
        }
      });
  });

});