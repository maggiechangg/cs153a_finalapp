import React from 'react'
import Bio from '../components/Bio';
import Audio from '../components/AudioRecording';
import { Render } from 'react-dom';
import { Button, View } from 'react-native';


 const DevScreens = ({navigation}) =>{
    return (
        <View>
        <Button title="Dev Bio" onPress={()=> navigation.navigate("Bio")} />
        <Button title="Dev Bio" onPress={()=> navigation.navigate("Bio")} />
        <Button title="Dev Bio" onPress={()=> navigation.navigate("Bio")} />
        </View>
    )
}
export default DevScreens;