  import React, { Component } from 'react';
  import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    CameraRoll
  } from 'react-native';
  import { connect } from 'react-redux';
  import * as actions from '../actions/actions';

  class ImageCard extends Component {

    constructor(props){
      super(props);
    }
    storeImages(data) {
      const { buildImageDeck, doneLoading } = this.props;
      //pull pictures out of cameraRoll
      const assets = data.edges;
      //pull images out of picture data
      const pics = assets.map( asset => asset.node.image )
      //maps pictures to add like and pick properties
      const images = pics.map( (image) => {
        return {
          ...image,
          like: undefined,
          pick: undefined
        }
      });
      //deck of images created and assigned to the state
      buildImageDeck(images);
      //change loading state so pictures get rendered in swipe cards
      doneLoading();

    }
    logImageError(err) {
       console.log(err);
    }
    //before render, grab photo info from cameraRoll, then store them to the state
    componentWillMount() {
      //dictates how many pictures to grab from most recent in cameraRoll
      const fetchParams = {
          first: this.props.numOfPics,
      };
      //conditional in case user tries to go to deckview without taking any pictures first
      if (this.props.numOfPics > 0){
        CameraRoll.getPhotos(fetchParams)
          .then((data) => this.storeImages(data), (e) => this.logImageError(e));
      }
    }
    //render pictures as image cards, ternary to allow for loading screen or lack of images
    render() {
      // IMAGECARD COMPONENT EXPECTS PROPS CALLED IMAGE TO BE PASSED TO IT
      const { img, isLoading, numOfPics } = this.props;
      console.log(this.props);
      return (
        <View style={styles.container}>
         {isLoading ?
           (numOfPics === 0 ? <Text>No pictures! Hit back to navigate to Camera</Text>
           : <Text>Loading</Text>)
           : <Image style={styles.image} source={{uri:img.uri}}/>
         }
        </View>
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      height: 300,
      width: 300
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      width: 300,
      height: 75,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10
    }
  })

  export default ImageCard;
