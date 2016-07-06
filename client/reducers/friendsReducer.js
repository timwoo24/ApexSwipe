import _ from 'underscore';

export default (state = [], action) => {
  switch (action.type) {
    case 'GET_FRIENDS': 
      return action.friends;
    case 'ADD_FRIEND':
      return action.friendsList;
    default:
      return state;
  }
}