import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, TextInput, ImageBackground } from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import UserService   from '../../services/userService';
import {User} from '../../types/types'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/button';

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  const goToHome2 = async () => {
    await navigation.navigate('Home2');
  };
  const goLogin = async () => {
    await navigation.navigate('Login');
  };
  const goCadastro = async () => {
    await navigation.navigate('Cadastro');
  };
  const goConvite = async () => {
    await navigation.navigate('Convite');
  };
  const goRecuperar = async () => {
    await navigation.navigate('RecuperarSenha');
  };
  const goToGrupo = async () => {
    await navigation.navigate('Grupo');
  };
  
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CustomButton title='Home' onPress={goToHome2}></CustomButton>
      <CustomButton title='Grupo' onPress={goToGrupo}></CustomButton>
      <CustomButton title='Entrar' onPress={goLogin}></CustomButton>
      <CustomButton title='Cadastro' onPress={goCadastro}></CustomButton>
      <CustomButton title='Convite' onPress={goConvite}></CustomButton>
      <CustomButton title='Recuperar senha' onPress={goRecuperar}></CustomButton>
      {/*  <CustomButton title='Details' onPress={goDatails}></CustomButton>
      <CustomButton title='ExemploEskeleton' onPress={goExemploEskeleton}></CustomButton>*/}
    </View>

  );

};

export default Home;