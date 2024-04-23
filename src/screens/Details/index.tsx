import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import UserService from '../../services/userService';
import { User } from '../../types/types';
import { StackRouteProp } from '../../routes/stack';
import { Button, Image,Platform, TextInput, StyleSheet} from 'react-native';
type DetailsScreenProps = {
    route: StackRouteProp<'Details'>;
};

const Details = ({ route }: DetailsScreenProps) => {
    const [user, setUser] = useState<User>(); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro
    const userService = new UserService();

    useEffect(() => {
        
        // Função assíncrona para buscar o usuário pelo ID
        const fetchUser = async () => {
            try {
               
                // Chamada ao método getUserById passando o ID do usuário desejado
                const fetchedUser : User = await userService.getUserById(route.params.userId);
                if (fetchedUser != null && Array.isArray(fetchedUser)) {                
                    setUser(fetchedUser[0]); // Atualiza o estado com os dados do usuário obtidos   
                } else {
                    setError('Usuário não encontrado ' + route.params.userId+ '.'); // Define mensagem de erro
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setError('Erro ao buscar usuário. Tente novamente mais tarde.'); // Define mensagem de erro
            } finally {
               // Define que o carregamento terminou
               setLoading(false);
            }
        };

        // Chamada da função para buscar o usuário quando o componente for montado
        fetchUser();
    }, []); // Passamos um array vazio como segundo argumento para useEffect para garantir que esta função seja executada apenas uma vez, quando o componente for montado

    return (
        <View>
            <Text style={styles.textTitle}>Detalhes do usuário</Text>
       
        <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'flex-start' }}>
            
            {loading ? (
                <Text>Carregando...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                
                user && (
                    <View style={styles.iew}>
                        <Text style={styles.text}>Nome: {user.username == null ? "-" : user.username }</Text>
                        <Text style={styles.text}>Senha: {user.password}</Text>
                        <Text style={styles.text}>Id: {route.params.userId}</Text>
                    </View>
                )
            )}
        </View>
        </View>
    );
};
const styles = StyleSheet.create({
 
    text: {
      fontSize: 24,
      padding: 30,
      paddingTop:30,
     color: 'gray',
      fontWeight: 'bold', 
      fontFamily: 'Arial', 
      textAlign: 'left', 
    },
    iew:{
        paddingTop:100,
    },
    textTitle:{
        fontSize: 46,
        paddingTop:50,
        color: '#007BFF', 
        fontWeight: 'bold', 
        fontFamily: 'Arial', 
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
  });
export default Details;