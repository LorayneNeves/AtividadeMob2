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
import { InputLogin } from '../../components/InputLogin/style';

const RecuperarSenha = () => {
  
  const navigation = useNavigation<StackTypes>();

  const RecuperarSenha2 = () => {
    navigation.navigate('RecuperarSenha2');
  };
return(
  
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  {Image && <Image style={styles.avatarContainer} source={require('../../assets/hello.jpg')}  />}
 <Text style={styles.text1}>Olá,</Text>
 <Text style={styles.text2}>Vamos recuperar sua senha</Text>
         <Text style={styles.text}>Confirme seu e-mail abaixo</Text>
        <InputLogin
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
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width and height for a circle
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
   // borderWidth: 2,
    //borderColor:'#E2001A' ,
    padding: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width and height for a circle
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  text: {
    fontSize: 23,
    padding: 10,
    color: '#E2001A',// Altere para uma cor que contraste bem com o plano de fundo
    fontWeight: 'bold', // Deixa a fonte mais gorda
    fontFamily: 'Arial', // Altere para a fonte desejada
    letterSpacing: 2,
    marginTop:10,
    marginBottom: 30
  },
  text1: {
    fontSize: 32,
    padding: 10,
    color: '#E2001A',// Altere para uma cor que contraste bem com o plano de fundo
    fontWeight: 'bold', // Deixa a fonte mais gorda
    fontFamily: 'Arial', // Altere para a fonte desejada
    letterSpacing: 2,
    marginTop:4,
    paddingHorizontal: 13
  },
  text2: {
    fontSize: 23,
    padding: 1,
    color: '#E2001A',// Altere para uma cor que contraste bem com o plano de fundo
    fontWeight: 'bold', // Deixa a fonte mais gorda
    fontFamily: 'Arial', // Altere para a fonte desejada
    letterSpacing: 2,
    marginTop:4,
    paddingHorizontal: 10
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
      backgroundColor:'#E2001A',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E2001A',
      marginBottom: 10,
      marginTop:30,

    },
    textButton:{
      color: '#FFFF',
      fontSize: 16,
      fontWeight: 'bold'
    },
});
export default RecuperarSenha;