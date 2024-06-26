import axios, { AxiosResponse } from 'axios';
import { Group } from '../types/group';
import { Image } from 'react-native';

const BASE_URL = 'http://192.168.1.5:3000/Group';//'https://localhost:7217/api/User/'

class groupService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }
     
      async deleteGroup(groupId: number): Promise<boolean> {
        try {
          const response = await axios.delete(`${BASE_URL}/${groupId}`);
          return response.status === 200; // Retorna true se o grupo foi excluído com sucesso
        } catch (error) {
          console.error('Erro ao excluir grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }
      
      async addGroup(group: Group): Promise<boolean> {
        try {
        const response = await axios.post(`${BASE_URL}`, group);
        
        const formData = new FormData();
        formData.append('username', group.name);
        formData.append('descricao', group.descricao);
    
    
        const responsePhoto = await fetch(group.photo);
    
        const blob = await responsePhoto.blob();
    
        formData.append('photo', blob, 'photo.jpg');
    
        const uploadResponse = await axios.post(BASE_URL+'addGroup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
          return uploadResponse.status === 201; // Retorna true se o usuário foi adicionado com sucesso
        
        } catch (error) {
          //console.error('Erro ao adicionar grupo:', error);
          return false; // Retorna false em caso de erro
        }
      }

  async getGroupById(groupId: number): Promise<Group> {
    try {
        const response: AxiosResponse<Group> = await axios.get(`${BASE_URL}?id=${groupId}`);             
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return { id: 0, name: '', descricao: '' , quantidade: 0, valor: 0, data: '', photo:''} ;
    }
  }

  async getAllGroups(): Promise<Group[]> {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar grupo pelo ID:', error);
        return null;
    }

  }
  
  async editGroup(groupId: number, editedGroupData: Partial<Group>): Promise<boolean> {
    try {
        const response = await axios.put(`${BASE_URL}/groups/${groupId}`, editedGroupData);
        return response.status === 200; // Retorna true se a edição for bem-sucedida
    } catch (error) {
        console.error('Erro ao editar grupo:', error);
        return false; // Retorna false em caso de erro
  }
}

}

export default groupService;