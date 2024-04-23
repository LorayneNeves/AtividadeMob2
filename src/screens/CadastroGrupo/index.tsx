import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, TextInput, StyleSheet} from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import GroupService   from '../../services/groupService';
import {Group} from '../../types/group'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import DateTimePicker from '@react-native-community/datetimepicker';

const CadastroGrupo = () => {
  
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [date, setDate] = useState(new Date());
    

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const groupService = new GroupService();

    const handleUpload = async () => {
      try {
        const group: Group = {
            name: name,
            quantidade: 0,
            valor: 0,
            descricao: descricao ,
            data: '',
            photo: image
        };

          const groupAdded = await groupService.addGroup(group);
          if (groupAdded) {
              console.log('Grupo adicionado com sucesso!');
          } else {
              console.log('Erro ao adicionar grupo');
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
            placeholder="Nome"
            onChangeText={setName}
            value={name}
          />
  <Text style={styles.text}>Quantidade Max:</Text>
  <InputLogin  
            placeholder="Quantidade"
            onChangeText={setQuantidade}
            value={quantidade}
          />
          <Text style={styles.text}>Valor:</Text>
  <InputLogin  
            placeholder="Valor"
            onChangeText={setValor}
            value={valor}
          />
          <Text style={styles.text}>Descrição:</Text>
  <InputLogin  
            placeholder="Descrição"
            onChangeText={setDescricao}
            value={descricao}
          />
         <Text style={styles.text}>Data:</Text>
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                }}
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
export default CadastroGrupo;