import { StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform } from 'react-native';
import theme from '../styles/theme'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone FontAwesome ou outro ícone da biblioteca
import { WebView } from 'react-native-webview';

export default function Convite() {

  return (

    //<ImageBackground source={require('./src/assets/back.png')} style={[styles.background]}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
       {Image && <Image style={styles.avatarContainer} source={require('../assets/cute.jpg')}  />}

        <View style={{ alignItems: 'center' }}>
        <Text style={styles.text1}>Olá,</Text>
          <Text style={styles.text}>Voce foi convidado para o grupo Teste1, pelo H1</Text>
        
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
        <StatusBar />
      </View>
   // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of width and height for a circle
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //opacity: 0.9,
    backgroundColor: '#E2001A',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
    backgroundColor: '#E2001A',
  },

    text: {
      fontSize: 21,
      paddingHorizontal: 0,
      color: '#E2001A', 
      fontWeight: 'bold', 
      fontFamily: 'Arial', 
      textAlign: 'left', 
    paddingTop:20
    
  },
  text1: {
    fontSize: 25,
    paddingHorizontal: 0,
    color: '#E2001A', 
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    textAlign: 'left', 
  paddingTop:40
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
  button: {
    backgroundColor: '#FF6F00',
    width: 150,
      height:40,
      borderRadius: 8,
      
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF6F00',
      marginBottom: 10,
      marginTop:60,
  },
  button1: {
    backgroundColor:'#E2001A',
    width: 150,
      height:40,
      borderRadius: 8,
      
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E2001A',
      marginBottom: 10,
      marginTop:30,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 17,
    borderWidth: 1,
    borderRadius:30,
    borderColor: theme.colors.teste,
    padding: 15,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: theme.colors.white,
    color: theme.colors.black
  },

});