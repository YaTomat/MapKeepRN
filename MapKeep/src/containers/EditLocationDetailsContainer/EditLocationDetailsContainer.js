import React, { Component } from 'react';
import {
  Keyboard, View
} from 'react-native';
import { updateMarker } from '../../actions/markers'
import { connect } from 'react-redux';
import EditScreen from "../../components/EditScreen/EditScreen";
import { equalityCoordinatesFunc } from "../../utils/Coordinate";

class EditLocationDetailsContainer extends Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (<View>
        <EditScreen
          onChangeText={(text) => this.props.dispatch(updateMarker(this.props.coordinate, text, this.props.note))}
          fieldName={'Name'}
          styles={{height: 40}}
          fieldValue={this.props.title}
        />
        <EditScreen
          onChangeText={(text) => this.props.dispatch(updateMarker(this.props.coordinate, this.props.title, text))}
          fieldName={'Notes'}
          fieldValue={this.props.note}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  let { coordinate } = props.navigation.state.params
  console.log(state.marker.markers)
  let marker = state.marker.markers.find(equalityCoordinatesFunc({ lng: coordinate.longitude, lat: coordinate.latitude }))
  return ({
    coordinate: { latitude: marker.lat, longitude: marker.lng },
    note: marker.note,
    title: marker.name
  })
}

export default connect(mapStateToProps)(EditLocationDetailsContainer)
