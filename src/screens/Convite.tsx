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

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>Voce foi convidado para o grupo teste1, pelo h1</Text>
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //opacity: 0.9,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
  },

    text: {
      fontSize: 20,
      padding: 5,
      color: '#007BFF', 
      fontWeight: 'bold', 
      fontFamily: 'Arial', 
      textAlign: 'left', 
    
    
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
    backgroundColor: theme.colors.teste,
    width: 150,
      height:40,
      borderRadius: 8,
      
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.teste,
      marginBottom: 10,
      marginTop:30,
  },
  button1: {
    backgroundColor: theme.colors.red,
    width: 150,
      height:40,
      borderRadius: 8,
      
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.red,
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