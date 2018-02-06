import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';

class LocationDetailsContainer extends Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Location Details Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = state => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(LocationDetailsContainer)
