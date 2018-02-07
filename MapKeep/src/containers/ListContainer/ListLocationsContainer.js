import React, { Component } from 'react';
import {
  Keyboard, ListView, Text, View
} from 'react-native';
import styles from './styles'
import { updateMarker } from '../../actions/markers'
import { connect } from 'react-redux';
import EditScreen from "../../components/EditScreen/EditScreen";
import { coordinatesSydney, distance, equalityCoordinatesFunc } from "../../utils/Coordinate";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ListContainer extends Component {
  
  constructor() {
    super();
  }
  
  render() {
    console.log(this.props.dataSource)
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(rowData) => <Text style={styles.locationItem}>{rowData.name}</Text>}
      />
    );
  }
}

const mapStateToProps = (state) => {
  let markers = state.marker.markers.sort((markerA, markerB) => {
    return distance(coordinatesSydney.latitude, coordinatesSydney.longitude, markerA.lng, markerA.lat) - distance(coordinatesSydney.latitude, coordinatesSydney.longitude, markerB.lng, markerB.lat)
  })
  return ({
    dataSource: ds.cloneWithRows(markers)
  })
}

export default connect(mapStateToProps)(ListContainer)
