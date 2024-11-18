import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingComponent() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
});
