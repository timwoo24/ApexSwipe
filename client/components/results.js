import React, { Component } from 'react';
import { 
  View, 
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import ScrollCard from './scrollCard';
import helpers from '../util/helpers';
import * as actions from '../actions/actions';

export default class ResultsComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  renderYelpLogo() {
    const { currentViewDeck } = this.props;
    
    if(currentViewDeck.type === 'yelp') {
      return (
        <View style={styles.topBar}>       
          <Image
            style={styles.logo}
            source={require('../assets/yelp-logo-medium.png')}
          />
        </View>
      )
    }
  }
  
  render() {
    const { currentViewDeck, navigator } = this.props;
    const sorted = currentViewDeck.deck.sort( (a, b) => {
      return a.likes - b.likes;
    }).reverse();
    console.log(sorted);
    
    return (  
      <View style={[styles.container, {marginTop: 60}]}>
      
        { this.renderYelpLogo() }
        
        <View style={styles.results}>
          <ScrollView
            style={[styles.scrollView]}
            automaticallyAdjustContentInsets={false}    
            scrollEventThrottle={200}
          >
            {sorted.map((card, i) => <ScrollCard key={card._id} card={card} position={i}/>)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FCFF'
  },
  topBar: {
    padding: 5,
  },
  logo: {
    alignSelf: 'flex-end'
  },
  results: {
    flex: 1,
    marginBottom: 60,
  },
  scrollView: {
    height: 400
  },
});
