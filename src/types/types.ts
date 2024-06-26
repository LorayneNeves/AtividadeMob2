import { ImageSourcePropType } from 'react-native';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    photo?: string;
  }
  