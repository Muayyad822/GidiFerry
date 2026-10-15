import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SOSButton() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={styles.container}
      className="bg-red-600 w-16 h-16 rounded-full items-center justify-center shadow-2xl"
      onPress={() => navigation.navigate('SOS')}
    >
      <AlertTriangle size={32} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
    elevation: 10,
  }
});
