import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

interface DepartureTriggerProps {
  tripId: string;
  onDepart: () => void;
}

export default function DepartureTrigger({ tripId, onDepart }: DepartureTriggerProps) {
  const handleDepart = async () => {
    // 1. Update trip status to `enroute` in WatermelonDB
    // 2. Trigger webhook/API call to regulator
    
    Alert.alert(
      'Confirm Departure',
      'Are you sure you want to depart? This will seal the manifest and send it to the regulator.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Depart Vessel', 
          style: 'destructive',
          onPress: () => {
            console.log(`Webhook triggered for Trip ID: ${tripId}`);
            Alert.alert('Departed', 'Vessel is now enroute. Manifest sent.');
            onDepart();
          }
        }
      ]
    );
  };

  return (
    <View className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-200">
      <Text className="text-gray-600 mb-4 text-center">Ready to sail? Ensure all passengers are scanned.</Text>
      <TouchableOpacity 
        className="bg-red-500 p-4 rounded-xl items-center"
        onPress={handleDepart}
      >
        <Text className="text-white font-bold text-lg">Depart Vessel</Text>
      </TouchableOpacity>
    </View>
  );
}
