import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Location } from 'expo';
import { connect } from 'react-redux';

import { askForLocationPermissions, locationServicesEnabled } from './helpers';
import { API_CALL_REQUEST } from '../../redux';

import DirectionSelection from './components/DirectionSelection'
import ErrorMessage from './components/ErrorMessage';
import Bearing from './components/Bearing';


class Home extends Component {

  state = {
    errorMessage: null,
    mounted: false,
    heading: null,
  };

  async componentDidMount() {
    this.mounted = true

    if (await askForLocationPermissions() && await locationServicesEnabled()) {
      Location.watchHeadingAsync((obj) => {
        let heading = obj.magHeading;
        this.setState({ heading: `${heading.toFixed()}` });
      });

    } else {
      if (this.mounted) {
        this.setState({
          errorMessage: "Please ensure that location services have been allowed " +
            "for this application and that your devices\' GPS is enabled."
        })
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Bearing heading={this.state.heading} />
        {
          this.state.errorMessage ?
            <ErrorMessage text={this.state.errorMessage} />
            : <DirectionSelection onPress={() => this.props.onRequestAircraft(this.props.navigation, this.state.heading)} />
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestAircraft: (navigation, userDirection) => {
      navigation.navigate('Aircraft');
      dispatch({ type: API_CALL_REQUEST, userDirection });
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default connect(null, mapDispatchToProps)(Home);