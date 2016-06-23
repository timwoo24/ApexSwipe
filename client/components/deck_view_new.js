import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableOpacity
} from 'react-native';
import Card from './card';
import { connect } from 'react-redux';
import * as action from '../actions/actions';

let SWIPE_THRESHOLD = 120;

class deckViewNew extends React.Component{

  componentDidMount() {
    this._animateEntrance();
  }
  _animateEntrance() {
    Animated.spring(
      this.props.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//sets x,y to 0 when finger is detected  
      onPanResponderGrant: (evt, gestureState) => {
        //set x,y to 0
        this.props.pan.setOffset({x: this.props.pan.x._value, y: this.props.pan.y._value});
        this.props.pan.setValue({x: 0, y: 0});
      },
//value of x,y change relative to where finger started
      onPanResponderMove: Animated.event([
        null, {dx: this.props.pan.x, dy: this.props.pan.y}
      ]),
//returns 
      onPanResponderRelease: () => {
        if (this.props.pan.x._value > SWIPE_THRESHOLD) {      
          this._resetState(true)
        } else if (this.props.pan.x._value < -SWIPE_THRESHOLD){          
          this._resetState(false)
        } 
        Animated.spring(this.props.pan, {
          toValue: 0
        });       
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })

  }
  componentDidUpdate(prevProps, prevState) {
    this._panResponder = PanResponder.create({      
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//sets x,y to 0 when finger is detected  
      onPanResponderGrant: (evt, gestureState) => {
        //set x,y to 0
        this.props.pan.setOffset({x: this.props.pan.x._value, y: this.props.pan.y._value});
        this.props.pan.setValue({x: 0, y: 0});
      },
//value of x,y change relative to where finger started
      onPanResponderMove: Animated.event([
        null, {dx: this.props.pan.x, dy: this.props.pan.y}
      ]),
//returns 
      onPanResponderRelease: () => {
        if (this.props.pan.x._value > SWIPE_THRESHOLD) {      
          this._resetState(true)
        } else if (this.props.pan.x._value < -SWIPE_THRESHOLD){          
          this._resetState(false)
        } 
        Animated.spring(this.props.pan, {
          toValue: 0
        });       
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })    
  }

  _changePage(){
    if (this.props.currentCard >= 18) {
      this.props.navigator.push({ name: 'results' });
    }
  }

  _resetState(liked){
    // this.props.toggleLikeClick(liked);
    this.props.pan = new Animated.ValueXY();
    this.props.enter = new Animated.Value(0.5);
    this.props.changeCardSwipe();
    this._animateEntrance();
  }
  shouldComponentUpdate(nextProps, nextState){
    // return a boolean value
    return true;
  }
  render() {
   
    let [translateX, translateY] = [this.props.pan.x, this.props.pan.y];
    let rotate = this.props.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = this.props.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = this.props.enter;
    let animatedCard = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};
    const { currentDeck, currentCard } = this.props;

          // <Text style={styles.cardTitleStyle}>{mock.cardTitle}</Text>
          // <Image style={styles.cardPicStyle} source={{uri: 'mock.cardPic'}} />
    return (
      <View style={styles.container}>
        <View style={styles.searchResultsContainer}>
          <Image
            source={require('../assets/yelp-logo-large.png')}
          />
          <Text style={styles.searchResults}>{this.props.searchParam.term}</Text>
        </View>
        <Animated.View style={[styles.swipeCard, animatedCard]} {...this._panResponder.panHandlers}>
          <Card business={currentDeck[currentCard]} />
        </Animated.View>

        <TouchableOpacity 
        style={styles.leftSwipeBtn}
        onPress={() => {{this.props.changeCardSwipe(this.props.currentCard)} {this._changePage()}}}>
          <Text>LEFT</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.rightSwipeBtn}
          onPress={() => {{this.props.changeCardSwipe(this.props.currentCard)} {this._changePage()}}}>
          <Text>RIGHT</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FCFF'
  },
  searchResultsContainer:{
    flexDirection: 'row',
    position: 'absolute',
    left:0,
    top:0
  },
  searchResults:{
    padding: 30,
    fontSize: 20,   
    textAlign: 'left',
    margin: 10
  },
  swipeCard: {
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#000',
    width: 300,
    height: 300
  },
  cardTitleStyle:{
    position: 'absolute',
    left:0,
    top:0,
    color: '#888'
  },
  cardPicStyle:{
    width: 300,
    height: 300
  },
  leftSwipeBtn:{
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  leftSwipeText:{
  },
  rightSwipeBtn:{
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  rightSwipeText:{
  }
});

function mapStateToProps(state) {
  return { 
    pan: new Animated.ValueXY(),
    enter: new Animated.Value(0.5),
    searchParam: state.search,
    currentCard: state.currentCard,
    currentDeck: state.currentDeck    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // toggleLikeClick: (id, liked) => { dispatch(action.toggleLike(id, liked)) },
    changeCardSwipe: (id) => { dispatch(action.changeCard(id)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(deckViewNew);