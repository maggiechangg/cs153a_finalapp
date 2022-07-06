import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import File from '../components/File';
import FileInputModal from '../components/FileInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFiles } from '../contexts/FileProvider';
import colors from '../misc/colors';
import Welcome from './Welcome';


const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const FileScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { files, setFiles, findFiles } = useFiles();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseFiles = reverseData(files);

  const handleOnSubmit = async (title, composer, desc) => {
    const file = { id: Date.now(), title, composer, desc, time: Date.now() };
    const updatedFiles = [...files, file];
    setFiles(updatedFiles);
    await AsyncStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const openFile = file => {
    navigation.navigate('FileDetail', { file });
  };


  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findFiles();
    }
    const filteredFiles = files.filter(file => {
      if (file.title.toLowerCase().includes(text.toLowerCase())) {
        return file;
      }
    });

    if (filteredFiles.length) {
      setFiles([...filteredFiles]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findFiles();
  };

    return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
        
          <Text style={styles.header}>
            <FontAwesome5 name="music" size={24} color="black"/>
             {`   Good ${greet}, ${user.name}   `} 
            </Text>
          <View style={{
            borderStyle: 'dotted',
            borderWidth: 3,
            borderColor: '#6D8B74'
          }}>
          </View>
       
          <Text style={styles.searchText}>Search Below:</Text>
          {files.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 20 }}
              onClear={handleOnClear}
            />
          ) : null}

          <Text style={styles.fileTitle}>Files:</Text>

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseFiles}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <File onPress={() => openFile(item)} item={item} />
              )}
            />
          )}

          {!files.length ? (
            <SafeAreaView
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add File</Text>
            </SafeAreaView>
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <View style={{flexDirection: 'row', backgroundColor: '#E9EFC0'}}>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <FileInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
      <RoundIconBtn 
        antIconName='user' 
        title = "Dev" 
        onPress={() => navigation.navigate('DevScreens')} 
      />

      </View> 

    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#6D8B74",
    color: "white",
    lineHeight: 60,
    marginTop: 30,
    marginBottom: 20,
  },
  fileTitle: {
    fontSize: 20,
    marginBottom:2, 
    color: '#5F7161',
    marginTop: 20,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
    backgroundColor: "#E9EFC0",
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
  searchText: {
    fontSize: 20,
    color: '#5F7161',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default FileScreen;