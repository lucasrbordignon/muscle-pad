import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<CustomInputProps> = ({label, placeholder,secureTextEntry}) => {
  return (
    <View className='w-full flex mt-4 gap-2'>
      { label && <Text className="text-2xl font-bold text-zinc-800">{label}</Text>}
      <TextInput
        placeholder={placeholder}        
        className='border p-2 w-full rounded-xl'
        secureTextEntry={secureTextEntry}        
      />        
    </View>
  )
}

