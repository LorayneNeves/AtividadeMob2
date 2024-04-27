import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/userService';
import CustomButton from '../../components/button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { ContainerLogin } from './style';
import { View, Text, TouchableOpacity, StyleSheet, Image  } from 'react-native';


const Login = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
  
    const userService = new UserService();
    
    const navigation = useNavigation<StackTypes>();

    const EqueciSenha = () => {
      // Lógica para lidar com a edição do usuário
      navigation.navigate('RecuperarSenha');
    };

    const Cadastro = () => {
      // Lógica para lidar com a edição do usuário
      navigation.navigate('Cadastro');
    };

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
      //navigation.navigate('ExemploEskeleton');
    };

 
    return (
 
      <View style={styles.container} >
         {Image && <Image style={styles.avatarContainer} source={require('../../assets/astronaut.jpg')}  />}

          <Text style={styles.title}>Acesse sua conta</Text>
         
        <ContainerLogin >
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
          <CustomButton  title='Entrar' onPress={handleLogin}></CustomButton>
        </ContainerLogin>
        
        <View style={styles.buttonContainer} >
          <TouchableOpacity onPress={EqueciSenha}>
            <Text style={styles.resetButton}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Cadastro}>
            <Text style={styles.CadastroButton}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );

  };

  const styles = StyleSheet.create({
    container: {
      paddingTop:150,
   
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 40,
      width: '100%', 
      
    },
    resetButton: {
      color: '#E2001A',
      fontWeight: 'bold',
      
    },
    CadastroButton:{
      color: '#E2001A',
      fontWeight: 'bold',
    },
    avatarContainer: {
      marginLeft: 100,
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
    title:{
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 50, 
      marginTop: 20,
      paddingHorizontal: 70,
      paddingBottom: 90,
      width: '100%', // Us
      color: '#E2001A'
    }
  });
export default Login;