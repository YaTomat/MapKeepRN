import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import { Callout, Marker } from "react-native-maps/lib/components/MapView";

class EditableMarker extends Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <Marker coordinate={this.props.coordinate} title={this.props.title} ref={(refs) => this.markerRef = refs}>
        <Callout onPress={() => {
          if (this.markerRef) this.markerRef.hideCallout()
          this.props.onPress(this.props.coordinate)
        }}>
        </Callout>
      </Marker>
    );
  }
}

EditableMarker.propTypes = {
  coordinate: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string
};

export default EditableMarker;