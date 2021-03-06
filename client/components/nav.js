import React, { Component } from 'react';
import {
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
// import styles from '../assets/styles';


// import components for our routes
import Search from '../containers/searchContainer';
import Splash from '../containers/splashContainer';
import DeckView from '../containers/deckViewContainer';
import Results from '../containers/resultsContainer';
import Login from './login';
import Profile from './profile-view';
import Welcome from '../containers/welcomeContainer';
import Friends from '../containers/friendsListContainer';
import Camera from '../containers/cameraContainer';
import ViewDecks from '../containers/viewDecksContainer';
// import ViewDeckResults from '../containers/viewDeckResultsContainer';
import ViewDeckSwipe from '../containers/viewDeckSwipeContainer';
import WhoToShare from '../containers/whoToShareContainer';


const Routes = {
  search: Search,
  deckView: DeckView,
  results: Results,
  splash: Splash,
  login: Login,
  welcome: Welcome,
  friends: Friends,
  camera: Camera,
  saved: ViewDecks,
  // viewDeckResult: ViewDeckResults,
  viewDeckSwipe: ViewDeckSwipe,
  whoToShare: WhoToShare
}

export default class Nav extends Component {
  renderScene(route, navigator, splash) {
    const Component = Routes[route.name];
    return <Component route={route} navigator={navigator} splash={splash} />
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'welcome'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
             <Navigator.NavigationBar
               style={ styles.nav }
               routeMapper={NavigationBarRouteMapper} />
             }
        configureScene={ (route) => {
          if (route.name === 'friends') {
            return Navigator.SceneConfigs.FloatFromLeft;
          } else {
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }}
      />
    )
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            navigator.pop();
          }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>
      )
    } else {
      return null;
    }
  },

  RightButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { navigator.immediatelyResetRouteStack([{ name:'splash' }])}}>
          <Text style={ styles.rightNavButtonText }>Home</Text>
        </TouchableHighlight>
      )
    } else {
      return null;
    }
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>ApexSwipe</Text>
  }
};

const styles = StyleSheet.create({
  container: {
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
  }
});
