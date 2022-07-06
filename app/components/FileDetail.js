import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFiles } from '../contexts/FileProvider';
import FileInputModal from './FileInputModal';
import Audio from '../components/AudioRecording';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${month}/${day}/${year} - ${hrs}:${min}:${sec}`;
};

const FileDetail = (props) => {
  const [file, setFile] = useState(props.route.params.file);
  const { setFiles } = useFiles();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteFile = async () => {
    const result = await AsyncStorage.getItem('files');
    let files = [];
    if (result !== null) files = JSON.parse(result);

    const newFiles = files.filter(n => n.id !== file.id);
    setFiles(newFiles);
    await AsyncStorage.setItem('files', JSON.stringify(newFiles));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your file permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteFile,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('No thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, composer, desc, time) => {
    const result = await AsyncStorage.getItem('files');
    let files = [];
    if (result !== null) files = JSON.parse(result);

    const newFiles = files.filter(n => {
      if (n.id === file.id) {
        n.title = title;
        n.desc = desc;
        n.composer = composer;
        n.isUpdated = true;
        n.time = time;
        
        setFile(n);
      }
      return n;
    });

    setFiles(newFiles);
    await AsyncStorage.setItem('files', JSON.stringify(newFiles));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  const goToRecording = () => {
    props.navigation.navigate('AudioRecording')
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container]}
      >
        <SafeAreaView>
        <Text style={styles.time}>
          {file.isUpdated
            ? `Updated At ${formatDate(file.time)}`
            : `Created At ${formatDate(file.time)}`}
        </Text>
        <Text style={styles.title}>{file.title}</Text>
        <Text style={styles.composer}>Composer: {file.composer}</Text>
        <Text style={styles.descTitle}>Description:</Text> 
        <Text style={styles.desc}>{file.desc}</Text>
      </SafeAreaView>
      </ScrollView>

      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn 
          antIconName='edit' 
          onPress={openEditModal}
          style={{marginBottom: 15}}
        />
        <RoundIconBtn 
          antIconName='videocamera'
          style={{ backgroundColor: '#B4E197'}}
          onPress={goToRecording}
        />
      </View>
      <FileInputModal
        isEdit={isEdit}
        file={file}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  composer:{
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descTitle:{
    fontSize: 20,
    color: '#6D8B74',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    marginTop: 30,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default FileDetail;