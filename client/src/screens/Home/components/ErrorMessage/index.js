import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

const errorMessage = ({ text }) =>
    <Text style={styles.paragraph}>{text}</Text>

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default errorMessage;

