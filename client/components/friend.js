import React, { Component } from 'react';
import { 
  View,
  Text,
  Image,
  TouchableHighlight, 
  StyleSheet 
} from 'react-native';
import * as action from '../actions/actions';
import helpers from '../util/helpers';

export default class Friend extends Component {

  render() {
    const { id, friends, friend, profile, removeFriend, addFriend } = this.props;
    return (
      <TouchableHighlight
        style={styles.user}
        underlayColor={'lightgreen'}
        onPress={() => {
          helpers.removeFriend((friends) => {addFriend(friends)}, profile.userId, friend);
        }}
      >
        <Text>{ friend.email }</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 40,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10
  }
})