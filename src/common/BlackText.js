import React from 'react';
import {Text} from 'react-native';

const BlackText = ({children, style = {}}) => {
  const styles = {color: 'white', ...style};

  return <Text style={styles}>{children}</Text>;
};

export default BlackText;
