import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({

  //used in deck_view
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
    // borderWidth: 5,
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
  spacing:{
    padding: 20
  },
  swipeBtnText:{
    textAlign: 'center',
  },
  leftSwipeBtn:{
    borderColor: 'red',
    borderWidth: 2,
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
    flex:1,
    justifyContent: 'space-between',
    margin: 10,
    alignSelf: 'center'
  },
  leftSwipeText:{
  },
  rightSwipeBtn:{
    borderColor: 'green',
    borderWidth: 2,
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
    flex:1,
    justifyContent: 'space-between',
    margin: 10,
    alignSelf: 'center'
  },
  deleteBtn:{
    borderColor: 'blue',
    borderWidth: 2,
    padding: 20,
    borderRadius: 5,
    flex:1,
    margin: 20,
    bottom: 20,
    alignSelf: 'center'
  },
  swipeBtns:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    height: 50
  },
  rightSwipeText:{
  },

//used in card
  business: {
    fontSize: 30,
  },
  img: {
    height: 300,
    width: 300
  },
  yelp: {
    width: 100,
    height: 50,
    left: 10,
    top: 10,
  },

//used in search

  input: {
    padding: 5,
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    textAlign: 'center',
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  },
  back: {
    width: 60,
    height: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
  },
  slider: {
    height: 10,
    margin: 10,
  },

//used in nav
  navContainer: {
    flex: 1
  },
  title: {
    marginTop:4,
    fontSize:16
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 60,
    backgroundColor: '#efefef'
  },
//used in camera
  cameraContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 70,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  captureButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buildCameraDeck: {
    bottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,

  }
});
export default styles
