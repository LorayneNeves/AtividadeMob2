import React from 'react';
import { TextInputProps } from 'react-native';
import { InputGrupo, Title } from './style';
import { TextInput } from 'react-native-gesture-handler';

interface LoginProps  extends TextInputProps {
 placeholder : string  
}

const LoginInput= ({ placeholder, ...rest } : LoginProps) => {
  return (
      <InputGrupo {...rest} placeholder={placeholder}  
      />

  );
};

export default LoginInput;