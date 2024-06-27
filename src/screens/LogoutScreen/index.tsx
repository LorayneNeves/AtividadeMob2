import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const performLogout = async () => {
      await AsyncStorage.removeItem('userToken');

      navigation.dispatch(StackActions.replace('Login'));
    };

    const timeoutId = setTimeout(() => {
      performLogout();
    }, 1000); 

    return () => clearTimeout(timeoutId); 
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E2001A" />
      <Text>Saindo...</Text>
    </View>
  );
};

export default LogoutScreen;
