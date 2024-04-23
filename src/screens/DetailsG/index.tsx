import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import GroupService from '../../services/groupService';
import { Group } from '../../types/group';
import { StackRouteProp } from '../../routes/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
// EditGroup.tsx

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
    const groupService = new GroupService();


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
      <View>
        <Text style={styles.textTitle}>Editar Grupo</Text>

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
                <Text style={styles.text}>Data:</Text>
            <DateTimePicker style={styles.date}
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                }}
            />
        <Button title="Salvar" onPress={handleSave} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    textTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
      color: '#007BFF'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 40,
      fontSize: 16,
      padding: 5,
      marginTop: 5,
      marginLeft:33,
      color: '#007BFF', 
      fontWeight: 'bold', 
      fontFamily: 'Arial', 
      textAlign: 'left', 
      height: 40,
      width: 350,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: 40,
      color: '#007BFF'
    },
    date:{
      borderWidth: 6,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 40,
      padding: 6,
      paddingRight: 10,
      marginTop: 8,
      marginLeft:33,
      height: 40,
      width: 90,
    }
  });
  
  export default DetailsG;
  