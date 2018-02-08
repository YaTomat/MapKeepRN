import React, { Component } from 'react';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import styles from './styles'
import { getMarkers, addMarker } from '../../actions/markers'
import EditableMarker from "../../components/EditableMarker/EditableMarker";
import NavigationActions from "react-navigation/src/NavigationActions";
import { coordinatesSydney } from '../../utils/Coordinate'
import PropTypes from 'prop-types';

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
        provider={'google'}
        onPress={(event) => {
          this.props.dispatch(addMarker(event.nativeEvent.coordinate))
        }}
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={onRegionChange}
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


MapContainer.propTypes = {
  markers: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    markers: state.marker.markers
  }
}

export default connect(mapStateToProps)(MapContainer)
