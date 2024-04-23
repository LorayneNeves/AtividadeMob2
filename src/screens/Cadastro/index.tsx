import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, TextInput, StyleSheet} from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import UserService   from '../../services/userService';
import {User} from '../../types/types'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/button';
import { InputLogin } from '../../components/InputLogin/style';
import { InputEmail } from '../../components/InputEmail/style';
import PassWordInput from '../../components/Password';
import PassWordInput2 from '../../components/ConfirmaPassword';


const Cadastro = () => {
  const [login, setEmail] = useState<string>('');
    const [image, setImage] = useState('');
    const [name, setName] =  useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('')

    const pickImage = async () => {
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const userService = new UserService();

    const handleUpload = async () => {
      try {
        const user: User = {
            username: name,
            password: password, // Defina a senha como necessário
            photo: image
        };

          const userAdded = await userService.addUser(user);
          if (userAdded) {
              console.log('Usuário adicionado com sucesso!');
             // alert('Usuário adicionado com sucesso!');
              navigation.navigate('Login');
          } else {
            //alert('Erro ao adicionar usuário');
              console.log('Erro ao adicionar usuário');
              navigation.navigate('Login');
          }
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };

    const navigation = useNavigation<StackTypes>();
    

return (
  
       
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
  <Text style={styles.text}>Nome:</Text>
  <InputLogin  
            placeholder="Login"
            onChangeText={setName}
            value={name}
          />
  <Text style={styles.text}>E-mail:</Text>
  <InputEmail  
            placeholder="E-mail"
            onChangeText={setEmail}
            value={login}
          />
  <Text style={styles.text}>Senha:</Text>
  <PassWordInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
        <Text style={styles.text}>Confirmar Senha:</Text>
  <PassWordInput2
          placeholder="Password"
          onChangeText={setPassword2}
          value={password2}
        />
  <CustomButton title='Selecionar Imagem' onPress={pickImage}></CustomButton>
  
  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 , marginBottom: 10}} />}
  
  <CustomButton title='Upload' onPress={handleUpload}></CustomButton>
</View>
        
   

);

};
const styles = StyleSheet.create({
 
  text: {
    fontSize: 16,
    padding: 5,
    color: '#007BFF', 
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    textAlign: 'left', 
  }
});
export default Cadastro;