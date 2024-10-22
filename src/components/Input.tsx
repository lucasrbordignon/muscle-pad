import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  key?: string;
}

export const Input: React.FC<CustomInputProps> = ({...CustomInputProps}) => {
  return (
    <View className='w-full flex mt-4 gap-2'>
      {CustomInputProps.label && <Text className="text-2xl font-bold text-zinc-800">{CustomInputProps.label}</Text>}
      <TextInput
        placeholder={CustomInputProps.placeholder}        
        className='border p-2 w-full rounded-xl'
        secureTextEntry={CustomInputProps.secureTextEntry}     
        value={CustomInputProps.value}   
        onChangeText={CustomInputProps.onChangeText}
        key={CustomInputProps.key}
      />  
          
    </View>
  )
}

