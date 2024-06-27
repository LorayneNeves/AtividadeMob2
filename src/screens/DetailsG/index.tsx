import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import GroupService from '../../services/groupService';
import { Group } from '../../types/group';
import { StackRouteProp } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/button';
import { InputGrupo } from '../../components/InputGrupo/style';
import { Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

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
        <InputGrupo
          placeholder={`(${group?.name || 'Nome'})`}
          onChangeText={setEditedName}
          value={editedName}
          style={styles.input}
        />
        <Text style={styles.text}>Quantidade</Text>
        <InputGrupo

          placeholder={`(${group?.quantidade || 'Quantidade'})`}
          onChangeText={setEditedQuantidade}
          value={editedQuantidade}
          style={styles.input}
        />
<Text style={styles.text}>Descrição</Text>
        <InputGrupo
                  style={styles.input2}
                  placeholder={`(${group?.descricao || 'Descrição'})`}
                  onChangeText={setEditedDescricao}
                  value={editedDescricao}
                 
                />
      <Text style={styles.text}>Valor</Text>
      <TextInputMask
       placeholder={`(${group?.valor || 'Valor'})`}
        style={styles.inputValor}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: ''
        }}
        value={editedValor}
        onChangeText={setEditedValor}
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
      marginBottom: 40,
      fontSize: 16,
      padding: 5,
      marginTop: 5, 
      textAlign: 'left', 
      height: 40,
      width: 350,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
      color: '#E2001A',
      marginRight: 10,
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
    },
    label: {
      fontSize: 18,
      marginBottom: 10
    },
    inputValor: {
      width: '50%',
      height: 40,
      borderWidth: 1,
      borderColor: '#E2001A',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      marginRight: 12,
      marginTop: 20
    },
    input2: {
      width: '70%',
      height: 80,
      borderWidth: 1,
      borderColor: '#E2001A',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      marginRight: 42,
      marginTop: 20
    },
  });
  
  export default DetailsG;
  