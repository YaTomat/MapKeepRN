import React, { Component } from 'react';
import {
  Keyboard
} from 'react-native';
import { updateMarker } from '../../actions/markers'
import { connect } from 'react-redux';
import EditScreen from "../../components/EditScreen/EditScreen";

class EditLocationDetailsContainer extends Component {
  
  constructor() {
    super();
  }
  
  componentWillUnmount() {
    Keyboard.dismiss()
  }
  
  render() {
    return (
      <EditScreen onChangeText={(text) => this.props.dispatch(updateMarker(text))} fieldName={'Notes'}/>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(EditLocationDetailsContainer)
