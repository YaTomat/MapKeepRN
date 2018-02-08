import React, { Component } from 'react';
import {
  ListView, Text
} from 'react-native';
import styles from './styles'
import { connect } from 'react-redux';
import { coordinatesSydney, distance } from "../../utils/Coordinate";
import PropTypes from 'prop-types';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ListContainer extends Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(rowData) => <Text style={styles.locationItem}>{rowData.name}</Text>}
      />
    );
  }
}

ListContainer.propTypes = {
  dataSource: PropTypes.object
};


const mapStateToProps = (state) => {
  let markers = state.marker.markers.sort((markerA, markerB) => {
    return distance(coordinatesSydney.latitude, coordinatesSydney.longitude, markerA.lng, markerA.lat) - distance(coordinatesSydney.latitude, coordinatesSydney.longitude, markerB.lng, markerB.lat)
  })
  return ({
    dataSource: ds.cloneWithRows(markers)
  })
}

export default connect(mapStateToProps)(ListContainer)
