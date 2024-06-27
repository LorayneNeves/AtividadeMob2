import axios, { AxiosResponse } from 'axios';
import { UserGroup } from '../types/userGroup';
import { Group } from '../types/group';
import { User } from '../types/types';

const BASE_URL = 'http://192.168.1.5:3000/UserGroup';
const USER_URL = 'http://192.168.1.5:3000/User';
const GROUP_URL = 'http://192.168.1.5:3000/Group';

class UserGroupService {
  async addUserToGroup(userGroup: UserGroup): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}`, userGroup);
      return response.status === 201;
    } catch (error) {
      console.error('Erro ao adicionar usuário ao grupo:', error);
      return false;
    }
  }

  async removeUserFromGroup(userGroup: UserGroup): Promise<boolean> {
    try {
      const response = await axios.delete(`${BASE_URL}`, { data: userGroup });
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao remover usuário do grupo:', error);
      return false;
    }
  }

  async getGroupsForUser(userId: number): Promise<Group[]> {
    try {
      const response: AxiosResponse<Group[]> = await axios.get(`${BASE_URL}/groups?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar grupos para o usuário:', error);
      return [];
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(USER_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  }

  async getAllGroups(): Promise<Group[]> {
    try {
      const response: AxiosResponse<Group[]> = await axios.get(GROUP_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
      return [];
    }
  }
}

export default new UserGroupService();
