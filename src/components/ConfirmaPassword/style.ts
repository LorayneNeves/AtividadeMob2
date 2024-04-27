import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  margin-bottom: 16px;
  height: 40px;
  width: 80%;
  position: relative;
`;

export const InputPassword = styled.TextInput`
  flex: 1; /* Ocupar todo o espaço disponível */
  height: 40px;
  padding-horizontal: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #E2001A;
  paddingLeft: 10px;
`;

export const IconEye = styled(Feather)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: #E2001A;
`;
