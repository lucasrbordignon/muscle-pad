import { Input } from '@/src/components/Input';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight
 const paddingTop = Dimensions.get('window').height / 16

export default function Register() {
  return (
    <ScrollView
      className='bg-zinc-100 w-full px-12' 
      style={{ marginTop: statusBarHeight + 8, paddingTop: paddingTop }}
    >      
      <View className='flex-1 h-full items-center'>
        {/* <View className='flex-1 h-52 flex items-center'>      
          <Image source={require('../assets/logo.png')} className='flex-1' resizeMode='center'/>          
        </View>  */}

        <Text className="flex-1 text-4xl font-bold text-zinc-800 m-8">CADASTRE-SE</Text>
      </View>

      <Text className='flex-1 text-center text-zinc-600 font-semibold my-2'>Digite as informações abaixo e venha treinar com a gente!</Text>
      
      <Input label='Nome' placeholder='Digite seu nome...'/>
      <Input label='Sobrenome' placeholder='Digite seu sobrenome...'/>
      <Input label='Email' placeholder='Digite seu email...'/>
      <Input label='Senha' placeholder='Digite sua senha...'/>
      <Input label='Confirmar' placeholder='Confirme sua senha...'/>

      <TouchableOpacity 
        onPress={() => {}}
        className='bg-blue-500 p-3 rounded-xl mt-8 w-full'
      > 
        <View className='flex flex-row items-center justify-center gap-2'>        
          <Text className="text-white text-center font-semibold text-xl">Confirmar</Text>
          <Feather
            name='arrow-right'
            color='white'
            size={20}
          />
        </View>        
      </TouchableOpacity>     

      <View className='flex flex-row gap-2 justify-center m-2'>
        <Text className="text-zinc-800">Já possui cadastro?</Text>
        <TouchableOpacity 
          onPress={() => {}}        
        >
          <Link href={"/"} className="text-blue-500 underline">Entrar</Link>
        </TouchableOpacity>        
      </View>
    </ScrollView>
  );
}
