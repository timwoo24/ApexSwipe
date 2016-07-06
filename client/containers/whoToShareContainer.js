import { connect } from 'react-redux';
import helpers from '../util/helpers';
import WhoToShareComponent from '../components/whoToShare';
import * as action from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    user_id: state.welcome.profile.userId,
    currentDeck: state.currentDeck,
    shared: state.shared,
    friends: state.friends,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShared: (shareList) => { dispatch(action.addToShared(shareList)) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WhoToShareComponent);