import React from 'react'
import Bio from '../components/Bio';
import Audio from '../components/AudioRecording';
import { Render } from 'react-dom';
import { Button, View, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundIconBtn from '../components/RoundIconBtn';


 const DevScreens = ({navigation}) =>{
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Information </Text>
 
            <View style={{flexDirection:'row'}}>
                
                <RoundIconBtn 
                    antIconName='user' 
                    title = "Bio" 
                    onPress={() => navigation.navigate('Bio')} 
                />
                <RoundIconBtn 
                    antIconName='videocamera' 
                    title = "AudioRecord" 
                    onPress={() => navigation.navigate('AudioRecording')} 
                />
            </View> 
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9EFC0'
    },
    title:{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 80,
        backgroundColor: "#6D8B74",
        color: "white",
        justifyContent: "flex-start",
        width: 250,
    },
    bio:{
        margin: 20,
    }
});  

export default DevScreens;