import { StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform } from 'react-native';
import theme from './src/styles/theme';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone FontAwesome ou outro ícone da biblioteca
import 'bootstrap/dist/css/bootstrap.min.css';
import { WebView } from 'react-native-webview';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // aspect ratio 1:1 for a circle
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (

    <ImageBackground source={require('./src/assets/bk.jpeg')} style={[styles.background]}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>Cadastre-se</Text>
        </View>

        <TouchableOpacity onPress={pickImage}>
  <View style={styles.avatarContainer}>
    {image ? (
      <Image source={{ uri: image }} style={styles.avatarImage} />
    ) : (
      <FontAwesome name="user-circle" size={70} color="#007BFF" />
    )}
  </View>
</TouchableOpacity>


        <TextInput style={styles.input}
          placeholder='Nome'
          // onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        />
        <TextInput style={styles.input}
          placeholder='E-mail'
          // onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        />

        <TextInput style={styles.input}
          placeholder='Senha'
          // onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        />
        <TextInput style={styles.input}
          placeholder='Confirmar Senha'
          // onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <StatusBar />
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
    padding: 20,
    color: theme.colors.teste, // Altere para uma cor que contraste bem com o plano de fundo
    fontWeight: 'bold', // Deixa a fonte mais gorda
    fontFamily: 'Arial', // Altere para a fonte desejada
    letterSpacing: 2,
    marginTop:150,
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
    borderRadius: 5,
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
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: theme.colors.white,
    color: theme.colors.black
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width and height for a circle
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    //borderWidth: 1,
    borderColor: theme.colors.teste,
    padding: 15,

  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width and height for a circle

  },
  avatarText: {
    fontSize: 15,
  },
});
