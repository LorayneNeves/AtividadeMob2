import React, { useEffect, useState } from 'react';
import UserGroupService from '../../services/userGroupService'
import { User } from '../../types/types'
import { Group } from '../../types/group'
const UserGroupComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsersAndGroups = async () => {
      const fetchedUsers = await UserGroupService.getAllUsers();
      setUsers(fetchedUsers);
      const fetchedGroups = await UserGroupService.getAllGroups();
      setGroups(fetchedGroups);
    };

    fetchUsersAndGroups();
  }, []);

  const handleAddUserToGroup = async () => {
    if (selectedUser && selectedGroup) {
      const success = await UserGroupService.addUserToGroup({ userId: selectedUser, groupId: selectedGroup });
      if (success) {
        alert('Usuário adicionado ao grupo com sucesso!');
      } else {
        alert('Erro ao adicionar usuário ao grupo.');
      }
    } else {
      alert('Por favor, selecione um usuário e um grupo.');
    }
  };

  const handleRemoveUserFromGroup = async () => {
    if (selectedUser && selectedGroup) {
      const success = await UserGroupService.removeUserFromGroup({ userId: selectedUser, groupId: selectedGroup });
      if (success) {
        alert('Usuário removido do grupo com sucesso!');
      } else {
        alert('Erro ao remover usuário do grupo.');
      }
    } else {
      alert('Por favor, selecione um usuário e um grupo.');
    }
  };

  return (
    <div>
      <h2>Gerenciar Usuário-Grupo</h2>
      <div>
        <label>Selecionar Usuário:</label>
        <select onChange={e => setSelectedUser(Number(e.target.value))} value={selectedUser || ''}>
          <option value="" disabled>Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Selecionar Grupo:</label>
        <select onChange={e => setSelectedGroup(Number(e.target.value))} value={selectedGroup || ''}>
          <option value="" disabled>Selecione um grupo</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddUserToGroup}>Adicionar Usuário ao Grupo</button>
      <button onClick={handleRemoveUserFromGroup}>Remover Usuário do Grupo</button>
    </div>
  );
};

export default UserGroupComponent;
