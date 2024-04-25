import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  margin-bottom: 16px;
  height: 40px;
  border-color: gray;
  border-radius: 8px;
  border-width: 1px;
  width: 80%;
  flex-direction: row;
  align-items: center; /* Alinhar verticalmente */
`;

export const InputPassword = styled.TextInput`
  flex: 1; /* Ocupar todo o espaço disponível */
  height: 40px;
  padding-horizontal: 20px;
`;

export const IconEye = styled(Feather)`
  padding-horizontal: 10px;
  color: #FF6F00;
`;