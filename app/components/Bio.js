import {Image, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native';
import picture from '../images/nyme.jpeg';

const Bio = () => {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView> 
          <View> 
            <Text style = {styles.developer}> About the Developer:</Text>
          </View>
    
          <View> 
            <Text style = {styles.title}>Maggie Chang</Text>
          </View>
        
    
          <Image
              style={styles.newYork}
              source={picture}
          />
    
          <View>
            <Text style= {styles.nyDescription}> 
            Maggie Chang is a rising senior at Brandeis University majoring in Applied Mathematics and Cello Music Performance with a minor in Computer Science.
            She has a shiba inu named Yuki and loves going on hikes with him. In her free time, she likes to cook, listen to music, and game. 
            </Text>
    
            <Text style= {styles.descriptionTitle}>Description</Text>
            
            <Text style= {styles.description}> 
            This app is created to help musicians have a recording app. 
            Users will be able to log and record their musical progress and file it with a title, composer, and notes about their recordings. 
            Each file will be saved by the date and time to see the progress over time. 
            </Text>
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f4eec6'
      },
      
      developer:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:16,
        fontFamily: 'Verdana',
        backgroundColor:'#bca86e',
        color: '#f6f3ca',
        letterSpacing: 5,
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        paddingRight: 20,
        paddingLeft: 20
      },
     
      title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'Verdana',
        color: '#A07C2C',
        letterSpacing: 5,
        justifyContent: 'space-between',
        padding: 15, 
        paddingRight: 50,
        paddingLeft: 50
        
      },
    
      nyDescription: {
        textAlign: 'center',
        fontSize:12,
        fontFamily: 'Verdana', 
        letterSpacing: 1,
        padding: 10,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#644116'
      },
    
      descriptionTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:32,
        fontFamily: 'Verdana',
        backgroundColor:'lightyellow',
        color: '#bca86e',
        letterSpacing: 5,
        padding: 15,
        borderRadius: 10, 
      },
    
      description: {
        textAlign: 'center',
        fontSize:16,
        fontFamily: 'Verdana', 
        letterSpacing: 2,
        padding: 15,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#644116'
      },
    
      newYork: {
        width: 200,
        height: 300,
        borderWidth: 5,
        borderColor: '#bca86e',
        borderRadius:5,
        margin: 'auto',
      }
    });
export default Bio;
  


