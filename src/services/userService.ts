import axios, { AxiosResponse } from 'axios';
import { User } from '../types/types';


const BASE_URL = 'http://192.168.1.8:3000/User';//'https://localhost:7217/api/User/'

class userService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }

  async addUser(user: User): Promise<{ success: boolean, message: string }> {
    try {
    const response = await axios.post(`${BASE_URL}`, user);
    
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);

    const responsePhoto = await fetch(user.photo);

    const blob = await responsePhoto.blob();

    formData.append('photo', blob, 'photo.jpg');

    const uploadResponse = await axios.post(BASE_URL + '/addUser', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
      return { success: uploadResponse.status === 201, message: 'Usuário adicionado com sucesso!' };
    
    } catch (error) {
      console.error('Usuário adicionado com sucesso!', error);
    return { success: false, message: 'Usuário adicionado com sucesso!' };
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${username}&password=${password}`);
        //na aplicação de vocês não retorna array não e o metodo sera um post que retorna um unico usuario.
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.get(`${BASE_URL}?id=${userId}`);             
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return { id: 0, username: '', password: '' } ;
    }

}

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return null;
    }

  }

}

export default userService;