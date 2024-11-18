import React, { useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';

interface TrainingSession {
  id: string;
  description: string;
  dayOfTheWeek: string;
}

interface Props {
  treino: TrainingSession;
}

const daysOfWeek = [
  { label: 'Domingo', value: '1' },
  { label: 'Segunda-feira', value: '2' },
  { label: 'Terça-feira', value: '3' },
  { label: 'Quarta-feira', value: '4' },
  { label: 'Quinta-feira', value: '5' },
  { label: 'Sexta-feira', value: '6' },
  { label: 'Sábado', value: '7' },  
]

const getDayLabel = (value: string): string => {
  const day = daysOfWeek.find((item) => item.value === value);
  return day?.label ?? 'Dia não encontrado';
}

export const TreinoItem: React.FC<Props> = ({ treino }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleLongPress = () => {
    setModalVisible(true);
  };
  const handlePress = () => {
    console.log({ treinoId: treino.id });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={1000} // 2 segundos para abrir o modal
        key={treino.id}
      >
        <View className="border-2 border-blue-500 rounded-lg px-4 py-2">
          <Text className="font-semibold text-zinc-600 text-lg">{treino.description}</Text>
          <Text className="font-semibold text-zinc-600">{getDayLabel(treino.dayOfTheWeek)}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Modal Aberto!</Text>
            <Text>{treino.description}</Text>
            <Button title="Fechar Modal" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TreinoItem;
