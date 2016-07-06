import helpers from '../util/helpers';

//================================================

//Yelp Actions

//================================================

//action to send the search term to yelp api query
export const searchTerm = (term) => {
  return {
    type: 'SEARCH_TERM',
    term
  };
};

//action to send the search location to yelp api query
export const searchLocation = (location) => {
  return {
    type: 'SEARCH_LOCATION',
    location
  };
};

//action to reset the search parameters to empty strings
export const resetSearch = () => {
  return {
    type: 'RESET_SEARCH',
  };
};

//action to build a deck of yelp data
export const buildDeckYelp = (yelpData) => {
  return {
    type: 'BUILD_DECK_YELP',
    yelpData
  };
};

//================================================

//Deck Actions

//================================================

//action will increment currentCard by 1
export const nextCard = () => {
  return {
    type: 'NEXT_CARD'
  }
}
//action will decrement currentCard by 1
export const prevCard = () => {
  return {
    type: 'PREV_CARD'
  }
}

//action will toggle like property of index of currentDeck to true
// and it will also toggle votedOn to true
export const toggleLikeTrue = (index) => {
  return {
    type: 'TOGGLE_LIKE_TRUE',
    index
  }
}

//action will toggle like property of index of currentDeck to false
export const toggleLikeFalse = (index) => {
  return {
    type: 'TOGGLE_LIKE_FALSE',
    index
  }
}

//================================================

//Camera Actions

//================================================

//takePictureSuccess will increment a counter by one, so that the proper
//number of pics are pulled from the cameraRoll in buildImageDeck
export const takePictureSuccess = () => {
  return {
    type: 'TAKE_PICTURE_SUCCESS'
  }
}

//cameraModeOn will set a state boolean so that the deckview will render
//images instead of yelp cards- default is true
export const cameraModeOn = () => {
  return {
    type: 'CAMERA_MODE_ON'
  }
}

//changeToCameraMode will set a state boolean so that the deckview will render
//yelpCards instead of images
export const cameraModeOff = () => {
  return {
    type: 'CAMERA_MODE_OFF'
  }
}

//will create deck out of images from cameraRoll
export const buildImageDeck = (images) => {
  return {
    type: 'BUILD_IMAGE_DECK',
    images
  };
}

//will toggle status of loading images in deckview
export const doneLoading = () => {
  return {
    type: 'DONE_LOADING'
  }
}

//will toggle whether or not user would like to add picture to deck to
//send to friends
export const togglePickTrue = (index) => {
  return {
    type: 'TOGGLE_PICK_TRUE',
    index
  }
}

//will toggle whether or not user would like to add picture to deck to
//send to friends
export const togglePickFalse = (index) => {
  return {
    type: 'TOGGLE_PICK_FALSE',
    index
  }
}

//will build a new deck from picked pictures- not currently implemented
export const pickImageDeck = (deck) => {
  return {
    type: 'PICK_IMAGE_DECK',
    deck
  }
}

//================================================

//User Actions

//================================================

//will get users to for users view
export const getUsers = (users) => {
  return {
    type: 'GET_USERS',
    users
  }
}

//will get current user's friends for user's view
export const getFriends = (friends) => {
  return {
    type: 'GET_FRIENDS',
    friends
  }
}

//will add friend to current user's list of friends
export const addFriend = (friendsList) => {
  return {
    type: 'ADD_FRIEND',
    friendsList
  }
}

//
export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile
  }
}

//
export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
  }
}

//
export const setUserDecks = (userDecks) => {
  return {
    type: 'SET_USER_DECKS',
    userDecks
  }
}

export const setSharedDecks = (sharedDecks) => {
  return {
    type: 'SET_SHARED_DECKS',
    sharedDecks
  }
}

//
export const setCurrentViewDeck = (currentViewDeck) => {
  return {
    type: 'SET_CURRENT_VIEW_DECK',
    currentViewDeck
  }
}

//
export const changeCurrentViewCard = () => {
  return {
    type: 'CHANGE_CURRENT_VIEW_CARD'
  }
}

//
export const resetCurrentViewCard = () => {
  return {
    type: 'RESET_CURRENT_VIEW_CARD'
  }
}

//
export const showYelp = () => {
  return {
    type: 'SHOW_YELP'
  }
}

export const resetCurrentDeck = () => {
  return {
    type: 'RESET_CURRENT_DECK'
  }
}

//will get the current user's saved decks
export const fetchUserDecks = (userid) => {
  return (dispatch, getState) => {
    helpers.getUserCreatedDecks(userid, (userDecks) => {
      const set = () => {
        userDecks.reverse();
        dispatch( setUserDecks(userDecks) );
      };
      const decks = userDecks.length;
      let count = 0;
      userDecks.forEach( (deck, i) => {
        if(deck.type === 'yelp') {
          dispatch( showYelp() );
          const setDeck = () => {
            userDecks[i] = deck;
          }
          const length = deck.deck.length;
          let done = 0;
          deck.deck.forEach((card, j) => {
            helpers.getYelpBusiness(card.name, (business) => {
              deck.deck[j] = {
                ...business,
                _id: card._id
              };
              done++;
              if(done === length) {
                setDeck();
                count++;
              };
              if(count === decks) {
                set();
              }
            });
          })
        } else {
          userDecks[i] = deck;
          count++;
          if(count === decks) {
            set();
          }
        }
      });
    });
  }
}

//will fetch the current user's shared decks
export const fetchSharedDecks = (userid, callback) => {
  return (dispatch, getState) => {
    helpers.getUserSharedDecks(userid, (sharedDecks) => {
      const set = () => {
        sharedDecks.reverse();
        dispatch( setSharedDecks(sharedDecks) );
        if(callback !== undefined) {
          callback()
        };
      };
      const decks = sharedDecks.length;
      let count = 0;
      sharedDecks.forEach( (deck, i) => {
        if(deck.type === 'yelp') {
          dispatch( showYelp() );
          const setDeck = () => {
            sharedDecks[i] = deck;
          }
          const length = deck.deck.length;
          let done = 0;
          deck.deck.forEach((card, j) => {
            helpers.getYelpBusiness(card.name, (business) => {
              deck.deck[j] = {
                ...business,
                _id: card._id,
                likes: card.likes
              };
              done++;
              if(done === length) {
                setDeck();
                count++;
              };
              if(count === decks) {
                set();
              }
            });
          })
        } else {
          sharedDecks[i] = deck;
          count++;
          if(count === decks) {
            set();
          }
        }
      });
    })
  }
}

export const addToShared = (shareList) => {
  return {
    type: 'ADD_TO_SHARED',
    shareList
  }
}
