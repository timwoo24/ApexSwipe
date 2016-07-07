import React, { Component } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  StyleSheet,
  Linking,
  Image
} from 'react-native';

export default class ScrollCardImage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  
  render() {
    const { card, position } = this.props;
    const style = position === 0 ? [styles.card, styles.top] : styles.card;
    return (
      <View style={style}>
        <View>
          <Image style={styles.img} source={{uri:card.image_url}} />
        </View>
        
        <View style={styles.description}>
          <Text style={styles.name} >{ card.name }</Text>
          <Image style={styles.rating} source={{uri:card.rating_img_url}} />

          <Text style={styles.likeText}> This choice received: </Text>
          <Text style={styles.likeCount}>{ card.likes} likes </Text>

        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card:  {
    flexDirection: 'row', 
    height: 190,
    margin: 7,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    alignItems: 'stretch',
    borderWidth: 2
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
  likeText: {
    paddingTop: 20
  },
  likeCount: {
    fontFamily: "Trebuchet MS",
    fontSize: 40
  }
});
