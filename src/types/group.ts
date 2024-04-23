import { ImageSourcePropType } from 'react-native';

export interface Group {
    id?: number;
    name: string;
    quantidade: number;
    valor: number;
    descricao: string;
    data: string;
    photo?: string;
  }
  