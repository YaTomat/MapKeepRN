import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import styles from './styles'
import { getMarkers, updateMarker, addMarker } from '../../actions/markers'
import EditableMarker from "../../components/EditableMarker/EditableMarker";
import NavigationActions from "react-navigation/src/NavigationActions";
import { coordinatesSydney } from '../../utils/Coordinate'

const getInitialState = () => {
  return {
    region: coordinatesSydney,
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
        onPress={(event) => {
          this.props.dispatch(addMarker(event.nativeEvent.coordinate))
        }}
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChange}
      >
        {this.props.markers.map((marker, key) => {
          return (<EditableMarker
              key={key}
              coordinate={{ latitude: marker.lat, longitude: marker.lng }}
              title={marker.name}
              onPress={(coordinate) => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'Details',
                  params: { coordinate }
                }))
              }}
            />
          )
        })}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    markers: state.marker.markers
  }
}

export default connect(mapStateToProps)(MapContainer)
