import expect from 'expect';
import df from 'deep-freeze-strict';
import searchReducer from '../../../client/reducers/searchReducer';
import deckReducer from '../../../client/reducers/deckReducer';
import currentCardReducer from '../../../client/reducers/currentCardReducer';
import friendsReducer from '../../../client/reducers/friendsReducer';
import cameraReducer from '../../../client/reducers/cameraReducer';
import loadingReducer from '../../../client/reducers/loadingReducer';
import shareReducer from '../../../client/reducers/shareReducer';

describe('Reducers', () => {

  describe('searchReducer', () => {
    it('should update the search term', () => {
      const action = {
        type: 'SEARCH_TERM',
        term: 'taco'
      };

      const state = searchReducer(df({term: '', location: ''}), df(action));
      expect(state.term).toEqual(action.term);
    });

    it('should update the location', () => {
      const action = {
        type: 'SEARCH_LOCATION',
        term: 'Los Angeles'
      };

      const state = searchReducer(df({term: '', location: ''}), df(action));
      expect(state.location).toEqual(action.location);
    });

    it('should reset all search parameters', () => {
      const action = {
        type: 'RESET_SEARCH'
      };

      const state = searchReducer(df({term: 'taco', location: 'Los Angeles'}), df(action));
      expect(state.term).toEqual('');
      expect(state.location).toEqual('');
    });
  });

  describe('deckReducer', () => {

    // sample data
    const sampleData = [
      {
        name: 'Craft',
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/R2UOk6I-VFTHueU0FOCD5Q/ms.jpg",
        mobile_url: "http://m.yelp.com/biz/craft-los-angeles?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=M4AdD43rFrwW8bBM84G3cw",
        rating: 4.0,
        rating_img_url_large: "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
        review_count: 1415,
        liked: false
      }
    ]

    it('should build a new Yelp deck', () => {
      const action = {
        type: 'BUILD_DECK_YELP',
        yelpData: [
          ...sampleData
        ]
      };

      const state = deckReducer(df([]), df(action));
      expect(state.length).toEqual(1);
      expect(state[0].name).toEqual(action.yelpData[0].name);
      expect(state[0].review_count).toEqual(action.yelpData[0].review_count);
    });

    it('should toggle current card\'s like property to true within the current deck', () => {
      const stateBefore = [
        {like: false},
        {like: false},
        {like: false}
      ];

      const action = {
        type: 'TOGGLE_LIKE_TRUE',
        index: 1
      };

      const stateAfter = [
        {like: false},
        {like: true},
        {like: false}
      ];

      df(stateBefore);
      expect(deckReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should toggle current card\'s liked property to false within the current deck', () => {
      const stateBefore = [
        {like: true},
        {like: true},
        {like: true}
      ];

      const action = {
        type: 'TOGGLE_LIKE_FALSE',
        index: 1
      };

      const stateAfter = [
        {like: true},
        {like: false},
        {like: true}
      ];

      df(stateBefore);
      expect(deckReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should toggle current card\'s picked property to true within the current deck', () => {
      const stateBefore = [
        {pick: undefined},
        {pick: undefined},
        {pick: undefined}
      ];

      const action = {
        type: 'TOGGLE_PICK_TRUE',
        index: 1
      };

      const stateAfter = [
        {pick: undefined},
        {pick: true},
        {pick: undefined}
      ];

      df(stateBefore);
      expect(deckReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should toggle current card\'s picked property to false within the current deck', () => {
      const stateBefore = [
        {pick: true},
        {pick: true},
        {pick: true}
      ];

      const action = {
        type: 'TOGGLE_PICK_FALSE',
        index: 1
      };

      const stateAfter = [
        {pick: true},
        {pick: false},
        {pick: true}
      ];

      df(stateBefore);
      expect(deckReducer(stateBefore, action)).toEqual(stateAfter);
    });

    xit('should filter the currentDeck to only picked images', () => {
      const action = {
        type: 'PICK_IMAGE_DECK',
        deck: [
          ...sampleData
        ]
      };

      const state = deckReducer(df([]), df(action));
      expect(state.length).toEqual(1);
      expect(state[0].name).toEqual(action.yelpData[0].name);
      expect(state[0].review_count).toEqual(action.yelpData[0].review_count);
    });

    it('should reset the currentDeck to an empty array', () => {
      const stateBefore = [{},{},{}];
      const action = {
        type: 'RESET_CURRENT_DECK',
      };

      const stateAfter = [];
      df(stateBefore);
      expect(deckReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('currentCardReducer', () => {
    it('should reset currentCard to 0 when a new deck is built', () => {
      const stateBefore = 2;
      const action = {
        type: 'BUILD_DECK_YELP'
      }
      const stateAfter = 0;
      df(stateBefore);
      expect(currentCardReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should go to the next card', () => {
      const stateBefore = 0;
      const action = {
        type: 'NEXT_CARD'
      };
      const stateAfter = 1;

      df(stateBefore);
      expect(currentCardReducer(stateBefore, action)).toEqual(stateAfter);
    });
    it('should go to the previous card', () => {
      const stateBefore = 1;
      const action = {
        type: 'PREV_CARD'
      };
      const stateAfter = 0;

      df(stateBefore);
      expect(currentCardReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('friendsReducer', () => {
    it('should add a friend', () => {
      const beforeState = [];
      const action = {
        type: 'ADD_FRIEND',
        friendsList: [{email: '123@example.com', user_id: '123'}, { email: '456@example.com', user_id: '456' }]
      };

      const afterState = [{email: '123@example.com', user_id: '123'}, { email: '456@example.com', user_id: '456' }];

      df(beforeState);
      expect(friendsReducer(beforeState, action)).toEqual(afterState);
    });
  });

  describe('cameraReducer', () => {
    it('should increment the number of pics taken', () => {
      const stateBefore = { picsTaken: 0 };
      const action = {
        type: 'TAKE_PICTURE_SUCCESS',
      }
      const stateAfter = { picsTaken: 1 };
      df(stateBefore);
      expect(cameraReducer(stateBefore, action)).toEqual(stateAfter);
    });
    it('should toggle camera mode on', () => {
      const stateBefore = false;
      const action = {
        type: 'CAMERA_MODE_ON',
      }
      const stateAfter = { mode: true };
      df(stateBefore);
      expect(cameraReducer(stateBefore, action)).toEqual(stateAfter);
    });
    it('should toggle camera mode off', () => {
      const stateBefore = true;
      const action = {
        type: 'CAMERA_MODE_OFF',
      }
      const stateAfter = { mode: false };
      df(stateBefore);
      expect(cameraReducer(stateBefore, action)).toEqual(stateAfter);
    });

  });
  describe('loadingReducer', () => {
    it('should toggle the loading state off', () => {
      const stateBefore = true;
      const action = {
        type: 'DONE_LOADING',
      }
      const stateAfter = false;
      df(stateBefore);
      expect(loadingReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('shareReducer', () => {
    it('should add a list to the shared list', () => {
      const stateBefore = [];
      const action = {
        type: 'ADD_TO_SHARED',
        shareList: [{}, {}]
      }
      const stateAfter = [{}, {}];
      df(stateBefore);
      expect(shareReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

})
