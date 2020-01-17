import React, {useState, useEffect} from 'react';
import geolocation from 'react-native-geolocation-service';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

function getLocation() {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      // https://github.com/facebook/react-native/issues/22535
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission', permission);

        return geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          forceRequestLocation: true,
        });
      } else {
        reject(new Error('Refused the permission ACCESS_FINE_LOCATION'));
      }
    } else {
      geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

const initialState = {
  timestamp: 0,
  coords: {
    speed: 0,
    longitude: 0,
    latitude: 0,
  },
};

const statuses = ['Initial', 'Sent', 'Received', 'Failed'];

const Speed = () => {
  const [status, setStatus] = useState(0);
  const [state, setState] = useState({
    prevState: {...initialState},
    curState: {...initialState},
  });

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setStatus(1);
      console.log('getLocation');

      getLocation()
        .then((_res: any) => {
          console.log('_res', JSON.stringify(_res));

          const newState = {
            prevState: state.curState,
            curState: _res,
          };

          setState(() => newState);
          setStatus(2);
        })
        .catch(error => {
          setStatus(3);
          console.log('error', error);
        });
    }, 500);

    return () => {
      clearTimeout(intervalId);
    };
  }, [state, status]);

  const dateObj = new Date(1504095567183);
  const date = dateObj.toLocaleDateString('en-US');
  const time = dateObj.toLocaleTimeString('en-US');
  const datetime = `${date} ${time}`;

  console.log('datetime', datetime);


  return (
    <View>
      <Text>Request: {statuses[status]}</Text>
      <Text>{datetime}</Text>
      <Text style={styles.speedText}>
        {Math.round(state.curState.coords.speed * 3.6)}
      </Text>
      <Text>longitude: {state.curState.coords.longitude}</Text>
      <Text>latitude: {state.curState.coords.latitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  speedText: {
    fontSize: Dimensions.get('window').height / 2,
    marginTop: -Dimensions.get('window').height * 0.1,
    fontWeight: 'bold',
  },
});

export default Speed;
