import React from 'react';
import { TextInputProps } from 'react-native';
import { InputEmail, Title } from './style'; // Supondo que este seja o arquivo onde você definiu os componentes estilizados Input e Title
import { TextInput } from 'react-native-gesture-handler';

interface LoginProps  extends TextInputProps {
 placeholder : string  
}

const EmailInput= ({ placeholder, ...rest } : LoginProps) => {
  return (
      <InputEmail {...rest} placeholder={placeholder}  
      />

  );
};

export default EmailInput;