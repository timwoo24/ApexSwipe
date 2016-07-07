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
import ScrollCardContent from './scrollCardContent';
import ScrollCardImage from './scrollCardImage';
import helpers from '../util/helpers';
import * as actions from '../actions/actions';
import Accordion from 'react-native-collapsible/Accordion';

export default class ResultsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sortCurrentViewDeck } = this.props; 
    sortCurrentViewDeck();
  }

  _renderYelpHeader(section){
    return (
      <ScrollView
       style={styles.scrollViewHeader}
       automaticallyAdjustContentInsets={false}    
       scrollEventThrottle={200}
     >
       <ScrollCard key={section._id} card={section} />
     </ScrollView>
    )
  }

  _renderImageHeader(section){
    return (
      <ScrollView
       style={styles.scrollViewHeader}
       automaticallyAdjustContentInsets={false}    
       scrollEventThrottle={200}
     >
       <ScrollCardImage key={section._id} card={section} />
     </ScrollView>
    )
  }

  _renderYelpContent(section){
    return (
    <ScrollView
       style={styles.scrollViewContent}
       automaticallyAdjustContentInsets={false}    
       scrollEventThrottle={200}
     >
       <ScrollCardContent key={section._id} card={section} />
     </ScrollView>
    )
  }

  _renderImageContent(section){
    return (
      <ScrollView>
      </ScrollView>
    )
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

  render (){
    const { currentViewDeck, navigator } = this.props;
    const sortedDeck = currentViewDeck.deck.sort( (a, b) => {
      return a.likes - b.likes;
    }).reverse();

    return (
       <View style={[styles.container, {marginTop: 60}]}>      
        { this.renderYelpLogo() }        
        <View style={styles.results}>
          <ScrollView
            style={[styles.scrollView]}
            automaticallyAdjustContentInsets={false}    
            scrollEventThrottle={200}
          >
            <Accordion 
              sections = { sortedDeck }
              renderHeader={ currentViewDeck.type === "yelp" ? this._renderYelpHeader : this._renderImageHeader }
              renderContent={ currentViewDeck.type === "yelp" ? this._renderYelpContent : this._renderImageContent}
            />
          </ScrollView>
        </View>
      </View>
    )
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
