import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from 'react-native';
import styles from './styles'
import generalStyles from '../../styles/GeneralStyles'
import PropTypes from 'prop-types';

class EditScreen extends Component {
  
  constructor() {
    super();
  }
  
  componentWillUnmount() {
    Keyboard.dismiss()
  }
  
  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={styles.inputDescription}>{this.props.fieldName}</Text>
        <TextInput
          value={this.props.fieldValue}
          style={[styles.inputNote, this.props.styles]}
          placeholder="Type here for saving info about place!"
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

EditScreen.propTypes = {
  fieldName: PropTypes.string,
  onChangeText: PropTypes.func,
  fieldValue: PropTypes.string,
  styles: PropTypes.object
};

export default EditScreen;

