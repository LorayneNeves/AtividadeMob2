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
justify-content: space-between;

`;

export const InputPassword = styled.TextInput`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding-horizontal: 20px;
`;

export const IconEye = styled(Feather)`
  padding-horizontal: 10px;
  margin-top: 6px;
  color: #007BFF;
`;