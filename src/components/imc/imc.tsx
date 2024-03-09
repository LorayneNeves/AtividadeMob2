import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function App() {

  const [nome, setNome] = useState<string>('');
  const [idade, setIdade] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);

  function verificarIdade(){
    if(idade>=18)
      alert('voce é maior de idade');
    else
      alert('voce é menor de idade');
  }

  function verificarImc(){
    if(Number.isNaN(peso) || Number.isNaN(altura)){
      alert('Por favor preencha sua altura e peso.');
    }
    else{
      var resultado = peso/(altura * altura);
      alert('seu IMC é: ' + resultado);
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Hello World with Ts!</Text>
      <TextInput style={styles.input}
        placeholder='Digite seu nome'
        onChangeText={(txtNome) => setNome(txtNome)}
      />

      <Text style={styles.buttonText}>ola {nome}</Text>
    
      <TextInput style={styles.input}
        placeholder='Digite sua idade'
        onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        keyboardType='numeric'
      />
      
      <TouchableOpacity style={styles.button} onPress={verificarIdade}>
        <Text style={styles.buttonText}>Verificar idade</Text>
      </TouchableOpacity>

      <TextInput style={styles.input}
        placeholder='Digite sua altura, ex: 1.55'
        onChangeText={(txtAltura) => setAltura(parseFloat(txtAltura))}
        keyboardType='numeric'
      />

      <TextInput style={styles.input}
        placeholder='Digite seu peso, ex: 50.0'
        onChangeText={(txtPeso) => setPeso(parseFloat(txtPeso))}
        keyboardType='numeric'
      />

      <TouchableOpacity style={styles.button} onPress={verificarImc}>
        <Text style={styles.buttonText}>Ver IMC</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  input:{
    fontSize:20,
    borderWidth:2,
    borderRadius:5,
    borderColor:'#264753',
    padding: 10,
    width:200,
    marginBottom:10,
    marginTop: 10,
  },
  button:{
    backgroundColor: 'midnightblue',
    padding:10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:10,
  },
  buttonText:{
    color: 'black',
    fontSize:16,
    fontWeight:'bold',
  },
});
