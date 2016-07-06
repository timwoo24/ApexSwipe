import { connect } from 'react-redux';
import helpers from '../util/helpers';
import FriendsListComponent from '../components/friendsList';
import * as action from '../actions/actions';

const mapStateToProps = (state) => {
  return { 
    users: state.users,
    friends: state.friends,
    profile: state.welcome.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (users) => { dispatch(action.getUsers(users)) },
    getFriends: (friends) => { dispatch(action.getFriends(friends)) },
    addFriend: (users) => { dispatch(action.addFriend(users)) },
    removeFriend: (friend) => { dispatch(action.removeFriend(friend)) },
    addToShared: (user) => { dispatch(action.addToShared(user)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsListComponent);