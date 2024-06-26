import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import CustomButton from '../../components/button';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const mascoteImage = require('../../assets/usuario.jpg');

const SecretSantaScreen = () => {
  const [names, setNames] = useState([
    { id: 1, name: 'Maria' },
    { id: 2, name: 'João' },
    { id: 3, name: 'Pedro' },
    // Add more names as needed
  ]);

  const handleSortPress = async () => {
    if (names.length < 2) {
      Alert.alert('Erro', 'Você precisa de pelo menos dois participantes para sortear!');
      return;
    }

    // Shuffle the names array to simulate random sorting
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);

    // Display an alert with the sorted names
    Alert.alert('Sorteio Realizado', `Que legal! Você saiu com Maria`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
        <View style={styles.userInfo}>
      <Text style={styles.userInfoText}>{item.name}</Text>
      </View>
    </View>

    
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={names}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.button}>
      <CustomButton title="Sortear Nomes" onPress={handleSortPress} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

      title:{
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
        paddingTop:10
      },
      button:{
        justifyContent: "center",
        alignItems: "center",
        marginTop:30,
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
});

export default SecretSantaScreen;
