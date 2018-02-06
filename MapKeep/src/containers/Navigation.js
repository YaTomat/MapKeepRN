import React, { Component } from 'react';
import MapContainer from './MapContainer/MapContainer'
import LocationDetailsContainer from './LocationDetailsContainer/LocationDetailsContainer'
import { addNavigationHelpers, StackNavigator, HeaderBackButton, NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addListener } from '../utils/navigationRedux';
import { BackHandler }from "react-native";

const navigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  title: 'Location Details'
})

const DetailLocationStack = StackNavigator(
  {
    LocationsDetails: {
      screen: LocationDetailsContainer,
      navigationOptions
    },
  },
  {
  }
);

export const RootStack = StackNavigator(
  {
    Home: {
      screen: MapContainer,
    },
    Details: {
      screen: DetailLocationStack,
      navigationOptions
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

class App extends Component {
  //support native back button for android
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    this.props.dispatch(NavigationActions.back());
    return true;
  };
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };
  
  render() {
    const { dispatch, nav } = this.props;
    return (
      <RootStack
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);