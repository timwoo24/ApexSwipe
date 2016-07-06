
const toggleTrue = (card) => {
  return{
    ...card,
    like: true
  };
};

const toggleFalse = (card) => {
  return{
    ...card,
    like: false
  };
};

const togglePickTrue = (card) => {
  return{
    ...card,
    pick: true
  };
};

const togglePickFalse = (card) => {
  return{
    ...card,
    pick: false
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case 'BUILD_DECK_YELP':
      return [
        ...action.yelpData
      ]
    case 'BUILD_IMAGE_DECK':
      return [
        ...action.images
      ]
    case 'RESET_CURRENT_DECK':
      return []
    case 'TOGGLE_LIKE_TRUE':
      return state
        .slice(0,action.index)
        .concat(toggleTrue(state[action.index]))
        .concat(state.slice(action.index+1))
    case 'TOGGLE_LIKE_FALSE':
      return state
        .slice(0,action.index)
        .concat(toggleFalse(state[action.index]))
        .concat(state.slice(action.index+1))
    case 'TOGGLE_PICK_TRUE':
      return state
        .slice(0,action.index)
        .concat(togglePickTrue(state[action.index]))
        .concat(state.slice(action.index+1))
    case 'TOGGLE_PICK_FALSE':
      return state
        .slice(0,action.index)
        .concat(togglePickFalse(state[action.index]))
        .concat(state.slice(action.index+1))
    default:
      return state
  }
};
