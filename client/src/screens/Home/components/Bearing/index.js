import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default Bearing = ({heading}) => {
  const text = heading ? `${heading}°` : 'Initializing compass...';
  return (
    <View>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
