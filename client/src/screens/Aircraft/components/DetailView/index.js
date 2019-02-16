import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { timeAgoInWords } from '../../../../helpers'

renderRow = details => (
  Object.entries(details).map(([key, value], index) => {
    return <Text style={styles.paragraph} key={index}>
      <Text style={styles.bold}>{key}</Text>: {value}</Text>
  })
)

extractDetails = aircraft => {
  return {
    ...(aircraft.Mdl && { Model: aircraft.Mdl }),
    ...(aircraft.Type && { Type: aircraft.Type }),
    ...(aircraft.Dst && { Distance: `${aircraft.Dst}km` }),
    ...(aircraft.From && { From: aircraft.From }),
    ...(aircraft.To && { To: aircraft.To }),
    ...(aircraft.Alt && { Altitude: `${aircraft.Alt} feet` }),
    ...(aircraft.Call && { CallSign: aircraft.Call }),
    ...(aircraft.Lat && aircraft.Long && { 'Lat/Long': `${aircraft.Lat}, ${aircraft.Long}` }),
    ...(aircraft.Spd && { Speed: `${aircraft.Spd} knots` }),
    ...(aircraft.Vsi && { 'Vertical speed': `${aircraft.Vsi} feet/min`}),
    ...(aircraft.Op && { Operator: aircraft.Op }),
    ...(aircraft.Year && { Year: aircraft.Year }),
    ...(aircraft.Cou && { Country: aircraft.Cou }),
    ...(typeof aircraft.Mil === 'boolean' && { Military: aircraft.Mil ? 'Yes' : 'No' }),
    ...(aircraft.Icao && { ICAO: aircraft.Icao }),
    ...(aircraft.Trak && { 'Track angle': `${aircraft.Trak}°`}),
    ...(aircraft.PosTime && { 'Updated': timeAgoInWords(aircraft.PosTime, Date.now()) }),
  }
};

export default DetailView = ({ aircraft }) => {
  const details = extractDetails(aircraft);
  return renderRow(details)
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
    margin: 5,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  }
});