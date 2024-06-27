import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import GroupService from '../../services/groupService';
import { Group } from '../../types/group';
import { StackNavigationProp } from '../../routes/stack';

const Grupo = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const groupService = new GroupService();
  const navigation = useNavigation<StackNavigationProp<'Grupo'>>();
  const { height, width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const mascoteImage = require('../../assets/avatar.jpg');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const fetchedGroups = await groupService.getAllGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Erro ao buscar grupo:', error);
      }
    };
    fetchGroup();
  }, [isFocused, navigation]);

  const handleEditGroup = (groupId: number) => {
    navigation.navigate('DetailsG', { groupId });
  };

  const handleSorteioGroup = () => {
    navigation.navigate('SorteioGrupo');
  };

  const handleDeleteGroup = async (groupId: number) => {
    const confirmed = await new Promise((resolve) => {
      Alert.alert(
        "Confirmação",
        "Tem certeza que deseja excluir este grupo?",
        [
          {
            text: "Cancelar",
            onPress: () => resolve(false),
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: () => resolve(true),
            style: "destructive"
          }
        ]
      );
    });

    if (confirmed) {
      try {
        const success = await groupService.deleteGroup(groupId);
        if (success) {
          setGroups(groups.filter(group => group.id !== groupId));
          Alert.alert("Sucesso", "Grupo excluído com sucesso!");
        } else {
          Alert.alert("Erro", "Não foi possível excluir o grupo.");
        }
      } catch (error) {
        console.error('Erro ao excluir grupo:', error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o grupo.");
      }
    }
  };

  const renderRightActions = (groupId: number) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteGroup(groupId)}>
      <Feather name="trash-2" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Group }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.item}>
        <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
        <TouchableOpacity onPress={handleSorteioGroup}>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditGroup(item.id)}>
          <Feather style={styles.settings} name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderSkeleton = () => (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor='#E2001A'
      foregroundColor='#FF6F00'
    >
      <Circle cx="36" cy="36" r="36" />
      <Rect x="80" y="10" rx="4" ry="4" width={200} height={14} />
      <Rect x="80" y="30" rx="4" ry="4" width={200} height={14} />
      <Rect x="80" y="50" rx="4" ry="4" width={200} height={14} />
    </ContentLoader>
  );

  if (loading) {
    return <View style={styles.container}>{renderSkeleton()}</View>;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('CadastroGrupo')}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tt: {
    fontSize: 16,
    padding: 5,
    color: '#007BFF', 
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    textAlign: 'left', 
  },
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
  settings:{
    color: '#FF6F00',
    paddingRight: 10,
    marginTop: 10,
    opacity: 0.5
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between', // Alinhar elementos à esquerda e botão à direita
  },
  add:{
    flexDirection: 'row-reverse',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    paddingLeft: 29,
    color: '#007BFF',
  },
  add1:{
    color: '#007BFF',
  },
  text:{
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%', // Centraliza horizontalmente
    bottom: 20,
    marginLeft: -30, // Metade da largura do botão para ajustá-lo ao centro
    backgroundColor: '#E2001A',
    borderRadius: 30,
    elevation: 8,
  },
});

export default Grupo;
