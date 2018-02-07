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
      <Marker coordinate={this.props.coordinate}>
        <Callout onPress={() => {
          this.props.onPress(this.props.coordinate)
        }}>
          <View>
            <Text>{this.props.title}</Text>
          </View>
        </Callout>
      </Marker>
    );
  }
}

EditableMarker.propTypes = {
  coordinate: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  note: PropTypes.string
};

export default EditableMarker;