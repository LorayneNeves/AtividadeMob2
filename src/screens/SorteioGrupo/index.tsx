import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, Modal, TextInput } from 'react-native';
import CustomButton from '../../components/button';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const mascoteImage = require('../../assets/usuario.jpg');

const SecretSantaScreen = () => {
  const [names, setNames] = useState([
    { id: 1, name: 'Maria' },
    { id: 2, name: 'João' },
    { id: 3, name: 'Pedro' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');

  const handleSortPress = async () => {
    if (names.length < 2) {
      Alert.alert('Erro', 'Você precisa de pelo menos dois participantes para sortear!');
      return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);

    Alert.alert('Sorteio Realizado', `Que legal! Você saiu com Maria`);
  };

  const handleDelete = (id) => {
    setNames((prevNames) => prevNames.filter((name) => name.id !== id));
  };

  const renderRightActions = (groupId) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(groupId)}>
      <Feather name="trash-2" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.item}>
        <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{item.name}</Text>
        </View>
      </View>
    </Swipeable>
  );

  const handleAddUser = async () => {
    // Adicione a lógica para adicionar o usuário ao grupo aqui
    if (userId.trim()) {
      setNames((prevNames) => [...prevNames, { id: names.length + 1, name: `Usuário ${userId}` }]);
      setUserId('');
      setModalVisible(false);
    } else {
      Alert.alert('Erro', 'Por favor, insira um ID de usuário válido');
    }
  };

  const handleCancel = async () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={names}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.button}>
        <CustomButton title="Sortear Nomes" onPress={handleSortPress} />
        <CustomButton title="Adicionar Usuário" onPress={async () => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Adicionar Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="ID do Usuário"
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
            <CustomButton title="Cancelar" onPress={handleCancel} />
            <CustomButton title="Adicionar" onPress={handleAddUser} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 2,
    paddingHorizontal: 120,
    paddingBottom: 9,
    width: '100%',
    color: '#E2001A'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingRight: 100
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 180
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%'
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E2001A',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
});

export default SecretSantaScreen;
