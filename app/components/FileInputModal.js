import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView, 
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const FileInputModal = ({ visible, onClose, onSubmit, file, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [composer, setComposer] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(file.title);
      setDesc(file.desc);
      setComposer(file.composer);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
    if (valueFor === 'composer') setComposer(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim() && !composer.trim()) return onClose();


    if (isEdit) {
      onSubmit(title, composer, desc, Date.now());
    } else {
      onSubmit(title, composer, desc);
      setTitle('');
      setComposer('')
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setComposer('');
      setDesc('');
    }
    onClose();
  };


  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <SafeAreaView style={styles.container}>
            <Text style={styles.firstLine}>Enter File Information Below:</Text>
            <SafeAreaView style={styles.btnContainer}> 
              <RoundIconBtn
                  size={15}
                  antIconName='check'
                  onPress={handleSubmit}
                />
                {title.trim() || composer.trim() || desc.trim() ? (
                  <RoundIconBtn
                    size={15}
                    style={{ marginLeft: 15 }}
                    antIconName='close'
                    onPress={closeModal}
                  />
                ) : null}
            </SafeAreaView>

            <View style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#6D8B74',
              marginBottom: 20,
              marginTop: 20,
            }}>
            </View>
              <ScrollView> 
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
              >
              <Text style={styles.inputText}>File Name:</Text>
              <TextInput
                value={title}
                onChangeText={text => handleOnChangeText(text, 'title')}
                style={[styles.input, styles.title]}
              />
              <Text style={styles.inputText}>Composer:</Text> 
              <TextInput
                value={composer}
                onChangeText={text => handleOnChangeText(text, 'composer')}
                style={[styles.input, styles.composer]}
              />
              
              <Text style={styles.inputText}>Description:</Text> 
              <TextInput
                value={desc}
                multiline
                style={[styles.input, styles.desc]}
                onChangeText={text => handleOnChangeText(text, 'desc')}
              />
              </KeyboardAvoidingView>
              </ScrollView>
          </SafeAreaView>
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
      </Modal>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#E9EFC0',
    flex: 1,
  },
  firstLine:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: "#6D8B74",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  inputText: {
    fontSize: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 55,
    fontWeight: 'bold',
    color: '#6D8B74',
  },
  composer: {
    height: 50,
    marginBottom: 50,
    color: '#6D8B74',
  },
  desc: {
    height: 100,
    color: '#6D8B74',
    marginBottom: 250,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default FileInputModal;