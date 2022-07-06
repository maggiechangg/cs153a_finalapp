import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from '../screens/Welcome'
import FileScreen from '../screens/FileScreen';
import FileDetail from '../components/FileDetail'
import FileProvider from '../contexts/FileProvider';
import Bio from '../components/Bio';
import Audio from '../components/AudioRecording';
import DevScreens from '../screens/DevScreens';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);


  const RenderFileScreen = props => <FileScreen {...props} user={user} />;
  if (isAppFirstTimeOpen) return <Welcome onFinish={findUser} />;
  return (
    <NavigationContainer>
      <FileProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}>
            <Stack.Screen component={RenderFileScreen} name='FileScreen' />
            <Stack.Screen component={FileDetail} name='FileDetail' />
            <Stack.Screen component={Bio} name="Bio" />
            <Stack.Screen component={Audio} name="AudioRecording" />
            <Stack.Screen component={DevScreens} name="DevScreens" />
        </Stack.Navigator>
      </FileProvider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});