import axios, { AxiosResponse } from 'axios';
import { User } from '../types/types';


const BASE_URL = 'http://192.168.1.5:3000/User'; //'http://192.168.1.8:3000/User' 'https://192.168.1.5:7038/api/usuario/'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Aumentar para 30 segundos
  headers: {'Content-Type': 'application/json'}
});


class userService {
  constructor() {
    // Se necessário, adicione inicializações aqui
  }

  async addUser(user: User): Promise<{ success: boolean, message: string }> {
    try {
      // Usar a instância configurada de axios
      const response = await api.post('/', user);
      
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('passwordConfirm,', user.passwordConfirm);

      const responsePhoto = await fetch(user.photo);
      const blob = await responsePhoto.blob();
      formData.append('photo', blob, 'photo.jpg');

      // Certifique-se de que a URL para o upload da foto está correta
      const uploadResponse = await api.post('/addUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { success: uploadResponse.status === 201, message: 'Usuário adicionado com sucesso!' };

    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return { success: false, message: 'Erro ao adicionar usuário.' };
    }
  }


  async validateUser(email: string, password: string): Promise<boolean> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${email}&password=${password}`);
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
        return { id: 0, email: '', username: '', password: '', passwordConfirm: '', photo:'' } ;
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