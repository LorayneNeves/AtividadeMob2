import React, { useEffect, useState , Fragment} from 'react';
import { StackTypes } from '../../routes/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, Button, TouchableOpacity, useWindowDimensions } from 'react-native';
import GroupService   from '../../services/groupService';
import {Group} from '../../types/group';
import butoon from '../../components/button';
import CustomButton from '../../components/button';
import { Feather } from '@expo/vector-icons';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native'
import Loading from '../../components/Loading';


// Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/avatar.jpg');

// Grupo.tsx

const Grupo = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const groupService = new GroupService();
    const navigation = useNavigation<StackTypes>();
  
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
    }, [useIsFocused, navigation]);
  
    const handleEditGroup = (groupId: number) => {
      navigation.navigate('DetailsG', { groupId });
    };
    
    const handleSorteioGroup = () => {
        navigation.navigate('SorteioGrupo');
      };
    const renderItem = ({ item, index }: { item: Group, index: number }) => (

        <View style={styles.item}>
            <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
            <TouchableOpacity onPress={() => handleSorteioGroup()}>
            <View style={styles.userInfo}>
                <Text style={styles.userInfoText}>{item.name}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditGroup(item.id)}>
                <Feather style={styles.settings} name="settings" size={24} color="black"/>
            </TouchableOpacity>
        
        </View>

    );
    
      const [loading, setLoading] = useState(true);
      const { height , width} = useWindowDimensions();
    
      // Simulando um tempo de carregamento
      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 2000 milissegundos (2 segundos)
        return () => clearTimeout(timer);
      }, []);
    
      // Função para renderizar o esqueleto
      const renderSkeleton = () => (
        <ContentLoader
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor='#E2001A'
        foregroundColor='#FF6F00'
      >
      
          {/* Coloque aqui o layout do esqueleto */}
          <Circle cx="36" cy="36" r="36" />      
          <Rect x="80" y="10" rx="4" ry="4" width={200} height={14} />
          <Rect x="80" y="30" rx="4" ry="4" width={200} height={14} />
          <Rect x="80" y="50" rx="4" ry="4" width={200} height={14} />
          {/* Um exemplo de esqueleto de carregamento */}
        </ContentLoader>
      );
    
      // Se ainda estiver carregando, exiba o esqueleto
      if (loading) {
        return <View style={styles.container}>{renderSkeleton()}</View>
       // return <Loading />
      }
    
      // Caso contrário, renderize o conteúdo real
     
    return (
      
    <View>
      {/* <View style={styles.add}>
        <Text style={styles.title}>Seus Grupos</Text>
      </View> */}
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

  

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
  editButton: {
 

  },
});

export default Grupo;