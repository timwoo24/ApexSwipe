import React, { Component } from 'react';
import { 
  View, 
  TextInput,
  Text,
  TouchableHighlight, 
  StyleSheet,
  ScrollView
} from 'react-native';
import User from './user';
import Friend from './friend';
// import styles from '../assets/styles';

export default class FriendsListComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var _scrollView: ScrollView;
    const { users, friends, addFriend, removeFriend, profile, addToShared, getFriends } = this.props;
    return (
      <View style={styles.container}>
        <Text>Users List</Text>
        <ScrollView
          style={[styles.userView]}
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}    
          scrollEventThrottle={200}
        >
        {users.map((user, i) => {return (
          <User
            key={i}
            user={user} 
            users={users}
            id={user.user_id}
            profile={profile}
            addFriend={addFriend} 
          />)})}
        </ScrollView>
        <Text style={styles.friendTitle}>Friends List</Text>
        <ScrollView
          style={[styles.userView]}
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}    
          scrollEventThrottle={200}
        >
        {friends.map((friend, i) => {return (
          <Friend
            key={i}
            friend={friend}
            friends={friends} 
            id={friend.user_id}
            profile={profile}
            removeFriend={removeFriend}
            addFriend={addFriend}
          />
          )})}
        </ScrollView>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 70
  },
  userView: {
    marginTop: 5,
    height: 25,
    borderColor: 'blue'
  },
  friendTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 240,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 5
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 40,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  }
})
