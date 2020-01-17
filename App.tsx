import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import Speed from './src/Speed';

KeepAwake.activate();

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" hidden />
      <KeepAwake />
      <SafeAreaView style={styles.body}>
        <Speed />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: 500,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
