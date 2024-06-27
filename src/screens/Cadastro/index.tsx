import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import UserService from '../../services/userService';
import { User } from '../../types/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/button';
import { InputLogin } from '../../components/InputLogin/style';
import { InputEmail } from '../../components/InputEmail/style';
import PassWordInput from '../../components/Password';
import PassWordInput2 from '../../components/ConfirmaPassword';

const Cadastro = () => {
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const userService = new UserService();

  const handleUpload = async () => {
    if (password !== password2) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    try {
      const user: User = {
        username: name,
        email: email,
        password: password,
        passwordConfirm: password2,
        photo: image
      };

      const { success, message } = await userService.addUser(user);
      
        Alert.alert('Sucesso', );
        navigation.navigate('Login');
     
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigation = useNavigation<StackTypes>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Cadastre-se</Text>
      {image && <Image style={styles.avatarContainer} source={{ uri: image }} />}
      <InputLogin
        placeholder="Nome"
        onChangeText={setName}
        value={name}
      />
      <InputEmail
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      />
      <PassWordInput
        style={styles.text1}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
      />
      <PassWordInput2
        style={styles.text1}
        placeholder="Confirmar senha"
        onChangeText={setPassword2}
        value={password2}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <CustomButton title='Selecionar Imagem' onPress={pickImage}></CustomButton>
      <CustomButton title='Confirmar' onPress={handleUpload}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    padding: 5,
    color: '#E2001A',
    fontFamily: 'Arial',
    paddingLeft: 10
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 80,
    paddingBottom: 30,
    width: '100%',
    color: '#E2001A'
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E2001A',
    padding: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Cadastro;
