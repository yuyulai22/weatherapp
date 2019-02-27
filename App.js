import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import FetchComponent from "./components/FetchComponent"

export default class App extends React.Component {
  render() {
    return (
       <View>
            <FetchComponent />
        </View>
    );
  }
}
