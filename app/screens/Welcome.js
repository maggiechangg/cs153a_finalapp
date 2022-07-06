import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const image = {uri: 'https://i.pinimg.com/564x/3b/ea/44/3bea44c2684356f3bb1a30783d127a16.jpg'};


const Welcome = ({ onFinish, navigation }) => {
  const [name, setName] = useState('');
  const [next, setNext] = useState(false);
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
      
  };

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.text}>Welcome to Sapling Test</Text>
        
        <Image 
          source={image} 
          style={styles.image} 
          resizeMode="contain"/>
        
        <Text style={styles.name}>Enter your name to begin:</Text>
        
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder='Enter Name Here:'
          style={styles.textInput}
        />

        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
        ) : null}

         <Text style={styles.quote}>"Progress is not achieved by luck or accident, but by working on yourself daily."{'\n'} -Epictetus</Text>
      </SafeAreaView>
    </>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFC0'
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 300/2,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    marginBottom: 20,
  },

  text: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    backgroundColor: "#6D8B74",
    color: "white",
    justifyContent: "flex-start",
  },

  quote: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    backgroundColor: "#6D8B74",
    color: "white",
    margin: 'auto',
    marginTop: 60,
  },

  name:{
    fontSize: 20,
    textAlign: 'center',
    marginBottom:2, 
    color: '#5F7161'
  },

  textInput: {
    fontSize: 16,
    textAlign: "center",
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#6D8B74",
    borderRadius: 5, 
    marginLeft: 15,
    marginRight: 15,
    height: 30,
  }
});

export default Welcome;