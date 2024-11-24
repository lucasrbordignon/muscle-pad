import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import * as Workout from '../../services/workouts';

interface Day {
  label: string;
  value: string;
}

interface TreinoItemProps {
  treino: TrainingSession;
  onLongPress: () => void;
}

export interface TrainingSession {
  created_at: string;
  dayOfTheWeek: string;
  description: string;
  id: string;
  user_id: string;
}

const daysOfWeek = [
  { label: 'Domingo', value: '1' },
  { label: 'Segunda-feira', value: '2' },
  { label: 'Terça-feira', value: '3' },
  { label: 'Quarta-feira', value: '4' },
  { label: 'Quinta-feira', value: '5' },
  { label: 'Sexta-feira', value: '6' },
  { label: 'Sábado', value: '7' },
];

const getDayLabel = (value: string): string => {
  const day = daysOfWeek.find((item) => item.value === value);
  return day?.label ?? 'Dia não encontrado';
};

export default function HomeScreen(): React.JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [dayOfTheWeek, setDayOfTheWeek] = useState('');
  const [data, setData] = useState<TrainingSession[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedTreino, setSelectedTreino] = useState<TrainingSession | null>(null);
  const [mode, setMode] = useState<'insert' | 'update'>('insert');
  const [loading, setLoading] = useState(false)

  const { signOut } = useAuth();

  const toggleModal = (treino?: TrainingSession, mode: 'insert' | 'update' = 'insert') => {
    setSelectedTreino(treino || null);
    setModalVisible(!isModalVisible);
    setMode(mode);
    if (!isModalVisible) {
      setDayOfTheWeek(treino?.dayOfTheWeek ?? '1');
      setDescription(treino?.description ?? '');
    }
  };

  const handleConfirm = async () => {
    const { success, data, errorMessage } = await Workout.insertWorkout(description, dayOfTheWeek);
    if (success) {
      console.log(data);
    } else {
      console.log(errorMessage);
    }
    toggleModal();
    setRefresh(true);
  };

  const handleLongPress = (treino: TrainingSession, mode: 'insert' | 'update') => {
    toggleModal(treino, mode);
  };

  const handleDelete = async () => {    
    console.log({selectedTreino})

    if (selectedTreino) {
      const { success, errorMessage } = await Workout.deleteWorkout(selectedTreino.id)

      if (success) {
        console.log('Treino excluído com sucesso');
        setRefresh(true);
      } else {
        console.log(errorMessage);
      }
    }

    toggleModal()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await Workout.selectByUserId();
        setData(data ?? []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    setRefresh(false);
  }, [refresh]);

  return (
    <View className='flex-1'>
      <ScrollView className='flex-1 bg-zinc-100 h-full w-full p-6 pb-12'>
        <Text className='font-semibold text-zinc-800 text-xl'>Selecione seu treino</Text>
        <View className='py-6 flex flex-col gap-4'>
          {data.map((treino) => (
            <TreinoItem key={treino.id} treino={treino} onLongPress={() => handleLongPress(treino, 'update')} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => toggleModal(undefined, 'insert')}
        className="absolute bottom-5 right-5 w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg"
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={signOut}
        className="absolute bottom-5 right-24 w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg"
      >
        <Text className="text-white text-3xl">-</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => toggleModal()}
      >
      <View className="flex-1 justify-center items-center bg-zinc-900/70">

        <View className="bg-zinc-200 rounded-lg w-80">
          <View className='w-full bg-blue-500 rounded-t-lg flex flex-row px-3 py-3 justify-between'>
            <Text className="text-lg font-semibold text-center text-zinc-100">{mode === 'insert' ? 'Adicionar treino' : 'Atualizar treino'}</Text>

            <TouchableOpacity onPress={() => toggleModal()} className="rounded-full">
              <Icon name='close' color='#f4f4f5'/>
            </TouchableOpacity>
          </View>

          <View className='p-6'>
            <Text className="font-semibold text-zinc-800 pb-2">Descrição</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Digite a descrição"
              className="border border-zinc-400 rounded-lg p-2 mb-4"
            />

            <View className="pb-4">
              <Text className="font-semibold text-zinc-800 pb-2">Selecione um Dia</Text>              
              <Dropdown
                style={{
                  borderWidth: 1,
                  borderColor: '#a1a1aa',
                  borderRadius: 8,
                  padding: 8,        
                  shadowColor: '#000'
                }}               
                placeholderStyle={{
                  color: '#71717a',
                  fontWeight: '400',
                  fontSize: 14
                }}      
                itemTextStyle={{
                  color: '#71717a',
                  fontWeight: '400',
                  fontSize: 14
                }}              
                selectedTextStyle={{
                  color: '#27272a',
                  fontWeight: '400',
                  fontSize: 14
                }}
                data={daysOfWeek}
                maxHeight={400}
                placeholder="Selecione um item"
                value={dayOfTheWeek}
                onChange={(item: Day) => {
                  setDayOfTheWeek(item.value);
                }}              
                labelField={'label'} 
                valueField={'value'}
              />           
            </View>

            {mode === 'insert' && (
              <TouchableOpacity onPress={handleConfirm} className="bg-blue-500 py-2 rounded-lg">
                <Text className="text-zinc-100 text-center text-lg font-semibold">Confirmar</Text>
              </TouchableOpacity>
            )}

            {mode === 'update' && (
              <TouchableOpacity
                onPress={() => handleDelete()}
                className="bg-red-500 py-2 rounded-lg mt-4"
              >
                <Text className="text-zinc-100 text-center text-lg font-semibold">Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      </Modal> 
    </View>
  );
}

const TreinoItem: React.FC<TreinoItemProps> = ({ treino, onLongPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/tabs/workout',
          params: { workoutId: treino.id, workoutName: treino.description },
        })
      }}
      onLongPress={() => onLongPress()}
      delayLongPress={1000} // 1 segundos para abrir o modal
    >
      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="font-semibold text-zinc-600 text-lg">{treino.description}</Text>
        <Text className="font-semibold text-zinc-600">{getDayLabel(treino.dayOfTheWeek)}</Text>
      </View>
    </TouchableOpacity>
  );
};
