import React, { Component } from 'react';
import { Text, View, ScrollView, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import DetailView from './components/DetailView';


class Aircraft extends Component {

  render() {
    let aircraftIndex = 0;

    if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
      aircraftIndex = this.props.navigation.state.params.aircraftIndex || 0;
    }

    return (
      <View style={styles.container}>
             { this.props.error ? <Text style={styles.paragraph}>{this.props.error}</Text>
               : this.props.fetching ? <ActivityIndicator size="large" color="#0000ff" />
               :  <ScrollView>
               <Button title="See nearby aircraft" onPress={() => this.props.navigation.navigate('NearbyAircraft')} />
               <DetailView aircraft={this.props.aircraft[aircraftIndex]} />
               </ScrollView>
             }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    aircraft: state.aircraft,
    error: state.error,
    location: state.location,
  };
};

export default connect(mapStateToProps, {})(Aircraft);


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