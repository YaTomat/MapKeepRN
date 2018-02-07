import React, { Component } from 'react';
import MapContainer from './MapContainer/MapContainer'
import EditLocationDetailsContainer from './EditLocationDetailsContainer/EditLocationDetailsContainer'
import { addNavigationHelpers, StackNavigator, HeaderBackButton, NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addListener } from '../utils/navigationRedux';
import { BackHandler }from "react-native";

const detailsNavigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  title: 'Location Details'
})

export const RootStack = StackNavigator(
  {
    Home: {
      screen: MapContainer,
    },
    Details: {
      screen: EditLocationDetailsContainer,
      detailsNavigationOptions
    },
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
    dispatch(NavigationActions.back());
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