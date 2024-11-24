import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const exercises = [
  {
    id: 1,
    description: 'Supino Reto',
    series: 4,
    repetitions: 10,
    isCompleted: false,
    details: [
      { set: 1, reps: 10, weight: 20, completed: false },
      { set: 2, reps: 10, weight: 20, completed: false },
      { set: 3, reps: 10, weight: 20, completed: false },
      { set: 4, reps: 10, weight: 20, completed: false },
    ],
  },
  {
    id: 2,
    description: 'Agachamento Livre',
    series: 3,
    repetitions: 12,
    isCompleted: false,
    details: [
      { set: 1, reps: 12, weight: 40, completed: false },
      { set: 2, reps: 12, weight: 40, completed: false },
      { set: 3, reps: 12, weight: 40, completed: false },
    ],
  },
];

const WorkoutScreen: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [exerciseData, setExerciseData] = useState(exercises);

  const { workoutId, workoutName } = useLocalSearchParams()

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const toggleCompletion = (exerciseId: number, setIndex?: number) => {
    setExerciseData((prevData) =>
      prevData.map((exercise) => {
        if (exercise.id === exerciseId) {
          if (setIndex !== undefined) {
            // Toggle individual set completion
            const updatedDetails = exercise.details.map((detail, index) =>
              index === setIndex
                ? { ...detail, completed: !detail.completed }
                : detail
            );
            return { ...exercise, details: updatedDetails };
          } else {
            // Toggle entire exercise completion
            return { ...exercise, isCompleted: !exercise.isCompleted };
          }
        }
        return exercise;
      })
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className='font-semibold text-zinc-800 text-xl'>{workoutName}</Text>

      <View className='py-6 flex flex-col gap-4'>
        {exerciseData.map((exercise) => (
          <View
            key={exercise.id}
            className="bg-white rounded-lg p-4 mb-4 shadow"
          >
            <TouchableOpacity
              onPress={() => toggleExpand(exercise.id)}
              className="flex-row justify-between items-center"
            >
              <Text className="text-lg font-bold">
                {exercise.description}
              </Text>
              {/* <CheckBox
                value={exercise.isCompleted}
                onValueChange={() => toggleCompletion(exercise.id)}
              /> */}
            </TouchableOpacity>
            <View className="flex-row mt-2">
              <Text className="flex-1 flex-row text-gray-600">
                📊 {exercise.series} séries
              </Text>
              <Text className="flex-1 flex-row text-gray-600">
                🔄 {exercise.repetitions} repetições
              </Text>
            </View>

            {expanded === exercise.id && (
              <View className="mt-4">
                <View className="grid grid-cols-4 gap-2">
                  <Text className="font-bold">Série</Text>
                  <Text className="font-bold">Reps</Text>
                  <Text className="font-bold">Carga</Text>
                  <Text className="font-bold">Estado</Text>

                  {exercise.details.map((detail, index) => (
                    <React.Fragment key={index}>
                      <Text>{detail.set}</Text>
                      <Text>{detail.reps}</Text>
                      <Text>{detail.weight} kg</Text>
                      {/* <CheckBox
                        value={detail.completed}
                        onValueChange={() =>
                          toggleCompletion(exercise.id, index)
                        }
                      /> */}
                    </React.Fragment>
                  ))}
                </View>

                <View className="flex-row mt-4 justify-between">
                  <Button
                    title="Finalizar Série"
                    onPress={() => alert('Série Finalizada!')}
                  />
                  <TouchableOpacity
                    onPress={() => toggleCompletion(exercise.id)}
                    className="bg-green-500 rounded-full p-2"
                  >
                    <Text className="text-white font-bold">✔</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WorkoutScreen