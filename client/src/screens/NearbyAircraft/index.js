import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';

class NearbyAircraft extends Component {

  onPressAircraft = index => {
     this.props.navigation.navigate('Aircraft', { aircraftIndex: index });
  }

  render() {
    renderList = () => {
      const sortedAircraft = this.props.aircraft.sort((a, b) => {
        return a.Dst - b.Dst;
      })

      return sortedAircraft.map((aircraft, index) => {
        return <TouchableHighlight key={aircraft['Id']} onPress={() => this.onPressAircraft(index)}>
          <View>
            <Text style={styles.paragraph}>{aircraft['Mdl']}
              <Text style={styles.small}> ({aircraft['Dst']}km, {aircraft.Trak}°)</Text>
            </Text>
          </View>
        </TouchableHighlight>
      })
    }
    return (
      <ScrollView>
         { renderList() }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    aircraft: state.aircraft,
  };
};

export default connect(mapStateToProps, {})(NearbyAircraft);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 16,
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  small: {
    fontWeight: 'normal',
  }
});