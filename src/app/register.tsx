import { Input } from '@/src/components/Input';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import z from 'zod';

const statusBarHeight = Constants.statusBarHeight
const paddingTop = Dimensions.get('window').height / 16

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  mail: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmacaoSenha"],
  message: "Senhas não coincidem",
});

export default function Register() {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const form = {
      name,
      lastName,
      mail,
      password,
      confirmPassword
    }

    const result = formSchema.safeParse(form);

    if (!result.success) {
      const errorMessages = result.error.errors[0].message
      Alert.alert("Erros no formulário", errorMessages);
    } else {
      // Sucesso
      Alert.alert("Sucesso", "Formulário válido!");
      console.log(result.data);
    }
  };

  return (
    <KeyboardAvoidingView className='flex-1'  behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          
          <Input label='Nome' placeholder='Digite seu nome...' value={name} onChangeText={setName}/>
          <Input label='Sobrenome' placeholder='Digite seu sobrenome...' value={lastName} onChangeText={setLastName}/>
          <Input label='Email' placeholder='Digite seu email...' value={mail} onChangeText={setMail}/>
          <Input label='Senha' placeholder='Digite sua senha...' value={password} onChangeText={setPassword} secureTextEntry={true}/>
          <Input label='Confirmar' placeholder='Confirme sua senha...' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>

          <TouchableOpacity 
            onPress={handleSubmit}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
