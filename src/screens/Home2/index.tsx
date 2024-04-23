import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, Button, TouchableOpacity } from 'react-native';
import UserService   from '../../services/userService';
import {User} from '../../types/types';
import butoon from '../../components/button';
import CustomButton from '../../components/button';
import { Feather } from '@expo/vector-icons';


//Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/mascoteImage.png');

const Home2 = () => {
  
  const [users, setUsers] = useState<User[]>([]);

  const renderItem = ({ item, index }: { item: User, index: number }) => (
    <View style={styles.item}>
      <View style={styles.userInfo}>
      <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
        <Text style={styles.userInfoText}>{item.username}</Text>
      </View>
     
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
       
          <Feather style={styles.settings} name="settings" size={24} color="black"/>

        </TouchableOpacity>
        
    </View>
  );

  const userService = new UserService();
  const navigation = useNavigation<StackTypes>();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers(); // Chame o método getAllUsers
        console.log('Usuários retornados:', fetchedUsers);
      
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []); // Use um array vazio para garantir que useEffect seja chamado apenas uma vez


  const handleEdit = (puserId: number) => {
    // Lógica para lidar com a edição do usuário
    navigation.navigate('Details', {userId : puserId});
  };

  
  return (
  
     <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
    
  );
}

const styles = StyleSheet.create({
  settings:{
    color: '#007BFF'
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between', // Alinhar elementos à esquerda e botão à direita
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  editButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  marginTop: 6,

  },
});

export default Home2;