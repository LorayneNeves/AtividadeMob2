import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/userService';
import CustomButton from '../../components/button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { ContainerLogin } from './style';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import RecuperarSenha from '../RecuperarSenha';


const RecuperarSenha2 = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
  
    const userService = new UserService();
    
    const navigation = useNavigation<StackTypes>();

    const handleLogin = async () => {
      const userId = 0;
      
      if (!login) {
        setUsernameError(true);
        return;
      } else {
        setUsernameError(false);
      }

     const isValid = await userService.validateUser(login, password);
      if (isValid) {
        setLogin('');
        setPassword('');
        navigation.navigate('Grupo');
      } else {
        alert('Usuário e/ou senha inválidos');
        navigation.navigate('Login');
      }

    };

 
    return (
 
      <View style={styles.container}>
          

        <ContainerLogin>
        {Image && <Image style={styles.avatarContainer} source={require('../../assets/joia.png')}  />}
        <Text style={styles.text}>Informe a senha enviada para seu e-mail</Text>
          <InputLogin  
            placeholder="Login"
            onChangeText={setLogin}
            value={login}
          />
          
          <PassWordInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
          />
          <CustomButton title='Entrar' onPress={handleLogin}></CustomButton>
          <CustomButton title='Enviar senha novamente' onPress={handleLogin}></CustomButton>
        </ContainerLogin>
        
      </View>
    );

  };

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
     // borderColor:'#E2001A' ,
      padding: 15,
     
    },
    avatarImage: {
      width: 100,
      height: 100,
      borderRadius: 50, // half of width and height for a circle
      
    },
    container: {
      paddingTop:370
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 40,
      width: '100%', // Usar largura total do container
    },
    resetButton: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    CadastroButton:{
      color: 'blue',
      textDecorationLine: 'underline',
    },
 
        text: {
          fontSize: 20,
          padding: 20,
          color: '#E2001A', // Altere para uma cor que contraste bem com o plano de fundo
          fontWeight: 'bold', // Deixa a fonte mais gorda
          fontFamily: 'Arial', // Altere para a fonte desejada
          letterSpacing: 1,
          marginBottom:40,
        },
  });
export default RecuperarSenha2;