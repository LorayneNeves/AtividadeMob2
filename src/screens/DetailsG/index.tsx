import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import GroupService from '../../services/groupService';
import { Group } from '../../types/group';
import { StackRouteProp } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/button';

const DetailsG = ({ route }: { route: StackRouteProp<'DetailsG'> }) => {
    const { groupId } = route.params;
    const [group, setGroup] = useState<Group | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [editedDescricao, setEditedDescricao] = useState<string | undefined>(undefined);
    const [editedName, setEditedName] = useState<string | undefined>(undefined);
    const [editedValor, setEditedValor] = useState<string | undefined>(undefined);
    const [editedQuantidade, setEditedQuantidade] = useState<string | undefined>(undefined);
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState('');
    const groupService = new GroupService();
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

    useEffect(() => {
      const fetchGroup = async () => {
        try {
               
            const fetchedGroup : Group = await groupService.getGroupById(route.params.groupId);
            if (fetchedGroup != null && Array.isArray(fetchedGroup)) {                
                setGroup(fetchedGroup[0]); // Atualiza o estado com os dados do usuário obtidos   
            } else {
                setError('Grupo não encontrado ' + route.params.groupId+ '.'); // Define mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao buscar grupo:', error);
            setError('Erro ao buscar grupo. Tente novamente mais tarde.'); // Define mensagem de erro
        } finally {
           // Define que o carregamento terminou
           setLoading(false);
        }
      };
  
      fetchGroup();
    }, []);
  
    const handleSave = async () => {
      try {
        await groupService.editGroup(route.params.groupId, {
          ...group!,
          name: editedName!,
          quantidade: parseInt(editedQuantidade || '0'),
        });
        
      } catch (error) {
        console.error('Erro ao editar grupo:', error);
        // Tratar erro
      }
    };
  
    if (!group) {
      return <Text>Carregando...</Text>;
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && <Image style={styles.avatarContainer} source={{ uri: image }}  />}
       

        <Text style={styles.text}>Nome</Text>
        <TextInput
          placeholder={`(${group?.name || 'Nome'})`}
          onChangeText={setEditedName}
          value={editedName}
          style={styles.input}
        />
        <Text style={styles.text}>Quantidade</Text>
        <TextInput

          placeholder={`(${group?.quantidade || 'Quantidade'})`}
          onChangeText={setEditedQuantidade}
          value={editedQuantidade}
          style={styles.input}
        />
<Text style={styles.text}>Valor</Text>
        <TextInput

        placeholder={`(${group?.valor || 'Valor'})`}
        onChangeText={setEditedValor}
        value={editedValor}
        style={styles.input}
        />
<Text style={styles.text}>Descrição</Text>
        <TextInput

                  placeholder={`(${group?.descricao || 'Descrição'})`}
                  onChangeText={setEditedDescricao}
                  value={editedDescricao}
                  style={styles.input}
                />
                <Text style={styles.text}>Data</Text>
            <DateTimePicker style={styles.date}
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                }}
            />
             
             <CustomButton title='Selecionar Imagem' onPress={pickImage}></CustomButton>
        <Button color="#E2001A"title="Salvar" onPress={handleSave} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    textTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
      color: '#E2001A'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 40,
      fontSize: 16,
      padding: 5,
      marginTop: 5,
     
      color: '#007BFF', 
      fontWeight: 'bold', 
      fontFamily: 'Arial', 
      textAlign: 'left', 
      height: 40,
      width: 350,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
      color: '#E2001A'
    },
    date:{
      marginTop: 8,
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50, // half of width and height for a circle
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25,
      borderWidth: 2,
      borderColor:'#E2001A' ,
      padding: 15,
    },
    avatarImage: {
      width: 100,
      height: 100,
      borderRadius: 50, // half of width and height for a circle
      
    }
  });
  
  export default DetailsG;
  