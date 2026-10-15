import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Ship, MapPin, Calendar } from 'lucide-react-native';
import { createTrip } from '../../database/actions';
import { database } from '../../database';
import Vessel from '../../database/models/Vessel';

export default function TripFormScreen({ navigation }: any) {
  const [origin, setOrigin] = useState('CMS');
  const [destination, setDestination] = useState('Ikorodu');
  const [vesselId, setVesselId] = useState('');
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [timeStr, setTimeStr] = useState('17:30');

  useEffect(() => {
    const loadVessels = async () => {
      try {
        const list = await database.get<Vessel>('vessels').query().fetch();
        setVessels(list);
        if (list.length > 0) {
          setVesselId(list[0].id);
        }
      } catch (err) {
        console.error('Failed to load vessels:', err);
      }
    };
    loadVessels();
  }, []);

  const handleSubmit = async () => {
    if (!origin || !destination) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!vesselId) {
      Alert.alert('Error', 'Please select a vessel');
      return;
    }

    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1] || '0', 10);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      Alert.alert('Invalid Time', 'Please enter a valid time in HH:MM format (24-hour, e.g. 17:30).');
      return;
    }

    // Lagos maritime night-ban: no trips scheduled after 18:30 (6:30 PM)
    if (hours > 18 || (hours === 18 && minutes > 30)) {
      Alert.alert(
        'Lagos State Night Ban',
        'Maritime regulation prohibits trip scheduling after 18:30 (6:30 PM) for passenger safety.'
      );
      return;
    }

    try {
      const departureTime = new Date();
      departureTime.setHours(hours, minutes, 0, 0);

      await createTrip({
        vesselId,
        origin,
        destination,
        departureTime,
      });
      Alert.alert('Success', 'Trip scheduled successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create trip');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <View className="px-6 flex-row items-center mt-4 mb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-gray-100 p-2 rounded-xl mr-4"
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-waterway-blue">New Trip</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Route Details</Text>
          
          <View className="bg-gray-50 rounded-3xl p-2 mb-4 border border-gray-100">
            <View className="flex-row items-center px-4 py-4">
              <MapPin size={20} color="#005A9C" />
              <TextInput 
                className="flex-1 ml-3 text-gray-800 font-medium"
                value={origin}
                onChangeText={setOrigin}
                placeholder="Origin (e.g. CMS)"
              />
            </View>
            <View className="h-[1px] bg-gray-200 mx-4" />
            <View className="flex-row items-center px-4 py-4">
              <MapPin size={20} color="#005A9C" />
              <TextInput 
                className="flex-1 ml-3 text-gray-800 font-medium"
                value={destination}
                onChangeText={setDestination}
                placeholder="Destination (e.g. Ikorodu)"
              />
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Vessel</Text>
          <View className="flex-row flex-wrap gap-2">
            {vessels.map((v) => {
              const isSelected = vesselId === v.id;
              return (
                <TouchableOpacity
                  key={v.id}
                  onPress={() => setVesselId(v.id)}
                  className={`flex-row items-center px-4 py-3 rounded-2xl border ${
                    isSelected 
                      ? 'bg-waterway-blue border-waterway-blue' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Ship size={18} color={isSelected ? '#FFFFFF' : '#005A9C'} />
                  <Text className={`ml-2 font-bold ${isSelected ? 'text-pure-white' : 'text-gray-700'}`}>
                    {v.name} ({v.capacity} seats)
                  </Text>
                </TouchableOpacity>
              );
            })}
            {vessels.length === 0 && (
              <Text className="text-gray-400 italic">No vessels available. Seed data in dashboard first.</Text>
            )}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Departure Time</Text>
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex-row items-center">
            <Calendar size={20} color="#005A9C" />
            <TextInput
              className="flex-1 ml-3 text-gray-800 font-bold"
              value={timeStr}
              onChangeText={setTimeStr}
              placeholder="Departure Time (e.g. 17:30)"
              keyboardType="default"
            />
            <Text className="text-gray-400 text-xs">(24-hour HH:MM)</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-waterway-blue p-6 rounded-[24px] items-center shadow-lg mb-12"
          onPress={handleSubmit}
        >
          <Text className="text-pure-white font-bold text-xl">Schedule Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
