import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const performLogout = async () => {
      // Limpa o token de usuário ou qualquer outro dado de autenticação armazenado
      await AsyncStorage.removeItem('userToken');
      
      // Reinicia a pilha de navegação para a tela de login
      navigation.dispatch(StackActions.replace('Login'));
    };

    performLogout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
