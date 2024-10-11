import { Input } from '@/src/components/Input';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View
      className='flex-1 justify-center items-center bg-zinc-100 h-full w-full px-12' 
      style={{ marginTop: statusBarHeight + 8 }}
    >      
      <View className='w-full h-52 flex items-center justify-center mb-12'>      
        <Image source={require('../assets/logo.png')} className='flex-1' resizeMode='center'/>  
      </View>     

      <Text className="text-4xl font-bold mb-4 text-zinc-800">LOGIN</Text>

      <Input label='Email' placeholder='Digite a seu email...'/>

      <View className='w-full flex mb-4 gap-2'>
        <Input label='Senha' placeholder='Digite a sua senha...' secureTextEntry={true}/>

        <View className='flex flex-row justify-between items-center mb-12 mt-2'>
          <View className='flex flex-row gap-1 items-center'>
            <Checkbox 
              style={{borderRadius: 24}}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#3b82f6' : undefined}
            />
            <Text className='text-zinc-800'>Mantenha-me conectado</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => {}}
          >
            <Link href={"/forgotPassword"} className="text-zinc-800 underline text-sm">Esqueci minha senha</Link>
          </TouchableOpacity>    
        </View>   
      </View>

      <TouchableOpacity 
        onPress={() => {}}
        className='bg-blue-500 p-3 m-2 w-full rounded-xl'
      > 
        <View className='flex flex-row items-center justify-center gap-2'>        
          <Text className="text-white text-center font-semibold text-xl">Inicie seu treino</Text>
          <Feather
            name='arrow-right'
            color='white'
            size={20}
          />
        </View>        
      </TouchableOpacity>     

      <View className='flex flex-row gap-1'>
        <Text className="text-zinc-800">ou</Text>
        <TouchableOpacity 
          onPress={() => {}}        
        >
          <Link href={"/register"} className="text-blue-500 underline">cadastre-se</Link>
        </TouchableOpacity>        
      </View>
    </View>
  );
}
