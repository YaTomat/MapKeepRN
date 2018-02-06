import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const getInitialState = () => {
  return {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
}

const onRegionChange = (region) => {
  this.setState({ region });
}

class MapContainer extends Component {
  
  constructor() {
    super();
    this.state = getInitialState();
  }
  
  render() {
    return (
      <MapView
        onPress={()=>{this.props.dispatch(NavigationActions.navigate({ routeName: 'Details' }))}}
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = state => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(MapContainer)
