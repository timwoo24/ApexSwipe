import React, { Component } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  StyleSheet,
  Linking,
  Image
} from 'react-native';

export default class ScrollCardContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  
  render() {
    const { card, position } = this.props;
    const style = position === 0 ? [styles.card, styles.top] : styles.card;
    return (
      <View style={style}>
        
        <View style={styles.displayAddressCol}>
          <Text> {card.location.display_address[0]}</Text>
          <Text> {card.location.display_address[1]}</Text>
          <Text> {card.location.display_address[2]}</Text>
        </View>
        <View style={styles.goToYelpCol}>
          <TouchableOpacity
            style= {styles.goToYelp}
            onPress={() => { Linking.openURL(card.url).catch(err => console.error('An error occurred', err)) }}
           >
            <Text style={styles.goToYelpText}>Check Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card:  {
    flexDirection: 'row', 
    height: 80,
    margin: 7,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    alignItems: 'stretch',
  },
  top: {
    borderWidth: 3,
    borderColor: '#e6e600',
  },
  img: {
    width: 175,
    height: 175,
    borderRadius: 5,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10
  },
  rating: {
    width: 84, 
    height: 17,
  },
  goToYelpCol: {
    flexDirection: "right",
    flex: 1,
    flexDirection: "column",
  },
  goToYelp: {
    flexDirection: "right",
    flex: 1,
    flexDirection: "column",
  },
  goToYelpText: {
    textDecorationLine: "underline",
    color: "blue",
    fontFamily: "Trebuchet MS",
    fontSize: 20,
    textAlign: 'center'
  }
});
