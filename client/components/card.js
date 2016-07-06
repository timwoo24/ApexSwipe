import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import styles from '../assets/styles';

class Card extends Component {

  constructor(props) {
    super(props);
  }
  //will render a card component containing an image, name, rating, and number
  //of reviews
  render() {
    // CARD COMPONENT EXPECTS PROPS CALLED BUSINESS TO BE PASSED TO IT
    const { business } = this.props;
    const image = business.image_url || require('../assets/yelp-logo-large.png');
    return (
      <View style={styles.container}>

        <Image style={styles.img} source={{uri:business.image_url}} />

        <Text style={{fontSize: 35}}>
          { business.name }
        </Text>

        <Image
          source={{ uri: business.rating_img_url_large }}
          style={{width: 166, height: 30}}
        />

        <Text style={styles.business}>
          { business.review_count } Reviews
        </Text>

      </View>
    );
  }
}

export default Card;
