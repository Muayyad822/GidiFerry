import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import { saveUserProfile } from '../../database/actions';

export default function SafetyProfileScreen({ navigation }: any) {
  const { completeProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const handleSaveProfile = async () => {
    if (!fullName || !phone || !emergencyName || !emergencyPhone) {
      Alert.alert('Validation Error', 'All fields including emergency contact details are mandatory for maritime safety laws.');
      return;
    }
    
    try {
      const savedUser = await saveUserProfile({
        fullName,
        phone,
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
      });
      
      Alert.alert('Profile Saved', 'Your safety profile has been recorded.', [
        { text: 'Continue', onPress: () => completeProfile(savedUser.id) }
      ]);
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save safety profile. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="mb-8 mt-4">
          <Text className="text-4xl font-bold text-waterway-blue mb-2">GidiFerry</Text>
          <Text className="text-lg text-gray-500">Complete your maritime safety profile</Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Full Name</Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-2xl text-base border border-gray-200"
            placeholder="e.g. Adebayo Ogunlesi"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Phone Number</Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-2xl text-base border border-gray-200"
            placeholder="e.g. 08012345678"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View className="p-5 bg-sky-blue/10 rounded-3xl mb-8 border border-sky-blue/20">
          <Text className="text-waterway-blue font-bold text-xl mb-2">Emergency Contact</Text>
          <Text className="text-xs text-gray-500 mb-6">
            Mandatory for maritime safety laws in Lagos.
          </Text>
          
          <View className="mb-5">
            <Text className="text-xs font-semibold text-gray-600 mb-1 ml-1">Contact Name</Text>
            <TextInput
              className="bg-white p-4 rounded-xl border border-gray-100"
              placeholder="Next of kin name"
              placeholderTextColor="#9CA3AF"
              value={emergencyName}
              onChangeText={setEmergencyName}
            />
          </View>

          <View>
            <Text className="text-xs font-semibold text-gray-600 mb-1 ml-1">Contact Phone</Text>
            <TextInput
              className="bg-white p-4 rounded-xl border border-gray-100"
              placeholder="Emergency phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
            />
          </View>
        </View>

        <TouchableOpacity 
          className="bg-waterway-blue p-5 rounded-2xl items-center shadow-lg active:opacity-90"
          onPress={handleSaveProfile}
        >
          <Text className="text-pure-white font-bold text-xl">Save Profile</Text>
        </TouchableOpacity>
        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
