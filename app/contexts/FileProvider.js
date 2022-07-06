import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FileContext = createContext();
const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const findFiles = async () => {
    const result = await AsyncStorage.getItem('files');
    if (result !== null) setFiles(JSON.parse(result));
  };

  useEffect(() => {
    findFiles();
  }, []);

  return (
    <FileContext.Provider value={{ files, setFiles, findFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);

export default FileProvider;