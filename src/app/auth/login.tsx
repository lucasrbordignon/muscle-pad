import { Input } from '@/src/components/Input';
import { useAuth } from '@/src/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from 'react-native-toast-message';
import { login } from '../../services/login';


const statusBarHeight = Constants.statusBarHeight
const paddingTop = Dimensions.get('window').height / 12

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth()
  
  return (
    <>
      <KeyboardAvoidingView className='flex-1' behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className='flex-1 bg-zinc-100 h-full w-full px-12' 
            style={{ marginTop: statusBarHeight + 8, paddingTop: paddingTop }}
          >      
            <View className='w-full h-52 flex items-center justify-center mb-12'>      
              <Image source={require('../../assets/logo.png')} className='flex-1' resizeMode='center'/>  
            </View>     

            <Text className="text-4xl font-bold mb-4 text-zinc-800 text-center">LOGIN</Text>

            <Input label='Email' placeholder='Digite a seu email...' value={email} onChangeText={setEmail}/>

            <View className='w-full flex mb-4 gap-2'>
              <Input label='Senha' placeholder='Digite a sua senha...' secureTextEntry={true} value={password} onChangeText={setPassword}/>

              <View className='flex flex-row justify-between items-center mb-12 mt-2'>              
                <TouchableOpacity 
                  onPress={() => {router.push('/auth/forgotPassword')}}
                >
                  <Text className="text-zinc-800 underline text-sm">Esqueci minha senha</Text>
                </TouchableOpacity>    
              </View>   
            </View>

            <TouchableOpacity 
              onPress={() => {handleLogin(email, password)}}
              className='bg-blue-500 p-3 m-2 rounded-xl'
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

            <View className='flex flex-row gap-1 justify-center'>
              <Text className="text-zinc-800">ou</Text>
              <TouchableOpacity 
                onPress={() => {{router.push('/auth/register')}}}     
              >
                <Text className="text-blue-500 underline">cadastre-se</Text>
              </TouchableOpacity>        
            </View>
          </ScrollView>

        </TouchableWithoutFeedback>


      </KeyboardAvoidingView>

      
      <Toast/>
    </>
  );

  async function handleLogin(email: string, password: string) {
    const { success, error, data } = await login(email, password)
  
    if (!success) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
        visibilityTime: 3000,
        position: 'top',
      });
  
      return null
    }  
  
    if (data.session.access_token) {
      await signIn(data.session.access_token, data.session.user.id)
      router.push('../tabs/home')
    }
  }
}
