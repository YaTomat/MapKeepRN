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
import { getMarkers } from '../../actions/markers'
import { Marker } from "react-native-maps/lib/components/MapView";

const getInitialState = () => {
  return {
    region: {
      latitude: -33.865143,
      longitude: 151.209900,
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
  
  componentWillMount() {
    this.props.dispatch(getMarkers())
  }
  
  render() {
    return (
      <MapView
        onPress={() => {
          this.props.dispatch(NavigationActions.navigate({ routeName: 'Details' }))
        }}
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChange}
      >
        {this.props.markers.map(marker => {
          console.log(marker)
          return (<Marker
              key={marker.key + marker.longitude + marker.latitude}
              coordinate={{ latitude: marker.lat, longitude: marker.lng }}
              title={marker.name}
            />
          )
        })}
      </MapView>
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
  return {
    markers: state.marker.markers
  }
}

export default connect(mapStateToProps)(MapContainer)
