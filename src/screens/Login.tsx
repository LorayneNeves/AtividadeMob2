import theme from '../styles/theme';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar, ImageBackground } from 'react-native';

export default function App() {

return(
  <ImageBackground source={require('./src/assets/bk.jpeg')} style={[styles.background]}>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <Text style={styles.text}>Entrar</Text>
   <TextInput style={styles.input}
      placeholder='E-mail'
      //onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
    />
     <TextInput style={styles.input}
      placeholder='Senha'
      //onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
    />
    <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>Entrar</Text>
    </TouchableOpacity>
    <StatusBar/>
  </View>
  </ImageBackground>
);
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  text: {
    fontSize: 48,
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
  button: {
    backgroundColor: theme.colors.teste,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 17,
    borderWidth: 1,
    borderRadius:30,
    borderColor: theme.colors.teste,
    padding: 15,
    width: 300,
    marginBottom: 40,
    marginTop: 10,
    backgroundColor: theme.colors.white,
    color: theme.colors.black
  },

});
