import _ from 'underscore';
const baseUrl = 'http://apex-swipe.herokuapp.com';
// const baseUrl = 'http://localhost:3000';


export default {

  searchYelp: (term, location, callback) => {
    const url = `${baseUrl}/yelpSearch?term=${term}&location=${location}`;

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        const businesses = data.businesses.map( business => {
          return {
            id: business.id,
            name: business.name,
            like: 0,
            image_url: business.image_url,
            url: business.url,
            review_count: business.review_count,
            rating_img_url: business.rating_img_url,
            rating_img_url_large: business.rating_img_url_large,
            rating_img_url_small: business.rating_img_url_small
          }
        })
        callback(businesses);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  getYelpBusiness: (id, callback) => {
    const url = `${baseUrl}/yelpSearch/business?id=${id}`;
    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(business) {
        const data = {
          id: business.id,
          name: business.name,
          like: 0,
          image_url: business.image_url,
          url: business.url,
          review_count: business.review_count,
          rating_img_url: business.rating_img_url,
          rating_img_url_large: business.rating_img_url_large,
          rating_img_url_small: business.rating_img_url_small,
          location: business.location
        }
        // console.log(data);
        callback(data);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  getUsers: (callback) => {
    const url = `${baseUrl}/users`;
    fetch(url)
      .then(function(response) {
        return response.json() ;
      })
      .then(function(user) {
        console.log(user);
        callback(user);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  getFriends: (callback, userid) => {
    const url = `${baseUrl}/users/friends/${userid}`;
    fetch(url)
      .then(function(response) {
        return response.json() ;
      })
      .then(function(user) {
        console.log(user);
        callback(user);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  addFriend: (callback, userid, user) => {
    const url = `${baseUrl}/users/friends/${userid}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        callback(user);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  removeFriend: (callback, userid, friend) => {
    const url = `${baseUrl}/users/friends/${userid}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_id: friend._id
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(friendsList) {
        callback(friendsList);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  getUserCreatedDecks: (userid, callback) => {
    const url = `${baseUrl}/decks/${userid}`;
    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(userDecks) {
        callback(userDecks);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  getUserSharedDecks: (userid, callback) => {
    const url = `${baseUrl}/decks/shared/${userid}`;
    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(sharedDecks) {
        callback(sharedDecks);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  updateLikeCount: (deckid, cardid, callback) => {
    const url = `${baseUrl}/decks/${deckid}`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        cardId: cardid
      })
    })
    fetch(request)
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        callback(response);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  updateSwipeStatus: (deckid, userId, callback) => {
    const url = `${baseUrl}/decks/shared/${deckid}`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        userId: userId
      })
    })
    fetch(request)
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        callback(response);
      })
      .catch(function(err) {
        console.log(err);
      })
  },
  
  postDeck: (user_id, name, deck, shared, type, callback) => {
    const builtDeck = deck.filter( card => card.like );
    const url = `${baseUrl}/decks`;
    const body = {
      user_id,
      type: type || 'camera',
      name,
      deck: builtDeck.map(card => {
        return {
          name: card.id || '',
          image_url: card.uri || null,
          likes: 1
        }
      }),
      shared: shared.map(user => {
        return {
          user_id: user.user_id,
          swiped: false
        }
      })
    };
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    });
    fetch(request)
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        callback(response);
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  sendToS3: (s3Cred, RNS3, currentCard, uriOnPhone, callback) => {
      let file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: uriOnPhone,
        name: uriOnPhone.substring(36,44),
        type: "image/png"
      };

      let options = {
        keyPrefix: "uploads/",
        bucket: "apexswipe",
        region: "us-west-1",
        accessKey: s3Cred.AWSAccessKeyId,
        secretKey: s3Cred.AWSSecretKey,
        successActionStatus: 201
      };

      RNS3.put(file, options).then(response => {
      if (response.status !== 201){
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body.postResponse.location);
      callback(currentCard, response.body.postResponse.location);
    })
  },


};
