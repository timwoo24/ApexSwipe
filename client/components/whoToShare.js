import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import _ from 'underscore';
import helpers from '../util/helpers';

export default class WhoToShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      name: ''
    }
  }
  
  addToSelected(friend) {
    let selected = this.state.selected;
    const index = _.findIndex(selected, (user) => user.user_id === friend.user_id);
    if(index === -1) {
      selected = [...this.state.selected, friend]
    } else {
      selected.splice(index, 1);
    }
    this.setState({
      selected: selected
    })
  }
  
  render() {
    const { user_id, friends, currentDeck, navigator } = this.props;
    const display = _.reject(friends, (friend) => friend.user_id === user_id);
    return(
      <View style={styles.container}>
        <Text>Who Would You Like to Share With?</Text>
        <View style={{height: 400}}>
          <ScrollView
            style={[styles.userView]}
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}    
            scrollEventThrottle={200}
          >
            {display.map((friend, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  style={this.state.selected.indexOf(friend) === -1 ? styles.user : [styles.user, styles.userSelected]}
                  underlayColor={'lightgreen'}
                  onPress={() => { this.addToSelected(friend) }}>
                  <Text>{ friend.email }</Text>
                </TouchableHighlight>
              )
            })}
          </ScrollView>
        </View>
        <View>
          <Text>Give your deck a name</Text>
          <TextInput 
            style={styles.input}
            autoCapitalize='none'
            maxLength={20}
            value={this.state.name}
            onChangeText={(name) => { this.setState({name: name}) }}
          />
        </View>
        
        <TouchableOpacity
          onPress={() => {
            if(currentDeck.length > 0 && !!currentDeck[0].id) {
              helpers.postYelpDeck(user_id, this.state.name, currentDeck, this.state.selected, () => {
                console.log('deck has been uploaded');
                // dispatch action to clear currentDeck
                // dispatch action to clear
              })
            } else {
              console.log('uploading camera deck');
              // post
              // helpers.postCameraDeck(user_id, this.state.name, currentDeck, this.state.selected, () => {
              //   console.log('deck has been uploaded');
              // })
            }
            this.setState({
              selected: [],
              name: ''
            });
            navigator.immediatelyResetRouteStack([{ name: 'splash' }]);
          }}
        >
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    padding: 5,
  },
  userView: {
    marginTop: 5,
    height: 25,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 40,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10
  },
  userSelected: {
    borderWidth: 3,
    borderColor: 'green'
  },
  input: {
    padding: 5,
    height: 40,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 4
  },
})