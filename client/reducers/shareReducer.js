export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_SHARED':
      return action.shareList;
    default:
      return state;
  }
};