import theme from '../../styles/theme';
import React from 'react';
import { useState } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone FontAwesome ou outro ícone da biblioteca
import { WebView } from 'react-native-webview';
import Button from '../../components/button'
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';

const RecuperarSenha = () => {
  
  const navigation = useNavigation<StackTypes>();

  const RecuperarSenha2 = () => {
    navigation.navigate('RecuperarSenha2');
  };
return(
  
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
 
         
        
         <Text style={styles.text}>Confirme seu e-mail abaixo</Text>
        <TextInput style={styles.input}
          placeholder='E-mail'
          //onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
          />
           <TouchableOpacity style={styles.CadastroButton} onPress={RecuperarSenha2}>
             <Text style={styles.textButton}>Enviar e-mail</Text>
           </TouchableOpacity>
       
       
  </View>

);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  text: {
    fontSize: 32,
    padding: 10,
    color: theme.colors.teste, // Altere para uma cor que contraste bem com o plano de fundo
    fontWeight: 'bold', // Deixa a fonte mais gorda
    fontFamily: 'Arial', // Altere para a fonte desejada
    letterSpacing: 2,
    marginTop:10,
  },
  
  textInput: {
    borderColor: theme.colors.teste,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 24,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10
  },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 40,
      width: '100%', // Usar largura total do container
    },
    CadastroButton:{
      width: 150,
      height:40,
      borderRadius: 8,
      backgroundColor: theme.colors.teste,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.teste,
      marginBottom: 10,
      marginTop:30,

    },
    textButton:{
      color: '#FFFF',
      fontSize: 16,
    },
  input: {
    fontSize: 17,
    borderWidth: 1,
    borderRadius:30,
    borderColor: theme.colors.teste,
    padding: 15,
    width: 300,
    marginBottom: 40,
    marginTop: 60,
    backgroundColor: theme.colors.white,
    color: theme.colors.black
  },
});
export default RecuperarSenha;