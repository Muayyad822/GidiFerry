import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, ShieldCheck, ArrowLeft } from 'lucide-react-native';

export default function EditProfileScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('Adebayo Ogunlesi');
  const [phone, setPhone] = useState('08012345678');
  const [emergencyName, setEmergencyName] = useState('Bisi Ogunlesi');
  const [emergencyPhone, setEmergencyPhone] = useState('08087654321');

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully.');
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <View className="px-6 flex-row items-center mt-4 mb-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-gray-100 p-2 rounded-xl mr-4"
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-waterway-blue">Edit Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Personal Details</Text>
          
          <View className="bg-gray-50 rounded-3xl p-2 mb-4 border border-gray-100">
            <View className="flex-row items-center px-4 py-3">
              <User size={20} color="#005A9C" />
              <TextInput 
                className="flex-1 ml-3 text-gray-800 font-medium"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
              />
            </View>
            <View className="h-[1px] bg-gray-200 mx-4" />
            <View className="flex-row items-center px-4 py-3">
              <Phone size={20} color="#005A9C" />
              <TextInput 
                className="flex-1 ml-3 text-gray-800 font-medium"
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Emergency Contact</Text>
          <View className="bg-sky-blue/5 rounded-3xl p-6 border border-sky-blue/10">
            <View className="flex-row items-center mb-4">
              <ShieldCheck size={20} color="#005A9C" />
              <Text className="ml-2 text-waterway-blue font-bold">Lagos Maritime Safety Law</Text>
            </View>
            
            <View className="mb-4">
              <Text className="text-xs text-gray-400 mb-2 ml-1">Contact Name</Text>
              <TextInput 
                className="bg-white p-4 rounded-2xl border border-gray-100 text-gray-800 font-medium"
                value={emergencyName}
                onChangeText={setEmergencyName}
              />
            </View>

            <View>
              <Text className="text-xs text-gray-400 mb-2 ml-1">Contact Phone</Text>
              <TextInput 
                className="bg-white p-4 rounded-2xl border border-gray-100 text-gray-800 font-medium"
                value={emergencyPhone}
                onChangeText={setEmergencyPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-waterway-blue p-6 rounded-[24px] items-center shadow-lg mb-12"
          onPress={handleSave}
        >
          <Text className="text-pure-white font-bold text-xl">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
