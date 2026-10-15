import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, CheckCircle2, Circle } from 'lucide-react-native';
import { useManifest } from '../../hooks/useManifest';

export default function ManifestViewerScreen({ route, navigation }: any) {
  const { tripId } = route.params;
  const { passengers, loading } = useManifest(tripId);

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <View className="px-6 flex-row items-center mt-4 mb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-gray-100 p-2 rounded-xl mr-4"
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold text-waterway-blue">Manifest</Text>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest">Trip #{tripId.slice(-4)}</Text>
        </View>
      </View>

      <View className="flex-1 px-6">
        <View className="bg-sky-blue/10 p-6 rounded-[32px] mb-6 flex-row justify-between items-center">
          <View>
            <Text className="text-waterway-blue font-bold text-3xl">{passengers.length}</Text>
            <Text className="text-waterway-blue/60 text-xs font-bold uppercase">Total Passengers</Text>
          </View>
          <View className="items-end">
            <Text className="text-waterway-blue font-bold text-3xl">
              {passengers.filter(p => p.checkInTime).length}
            </Text>
            <Text className="text-waterway-blue/60 text-xs font-bold uppercase">Boarded</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {loading ? (
            <Text className="text-gray-400 text-center mt-10">Loading manifest...</Text>
          ) : passengers.length === 0 ? (
            <View className="bg-gray-50 p-10 rounded-[40px] items-center border border-dashed border-gray-200 mt-4">
              <Text className="text-gray-400 text-center">No passengers have booked this trip yet.</Text>
            </View>
          ) : (
            passengers.map((passenger, index) => (
              <View 
                key={passenger.id}
                className="flex-row items-center justify-between bg-white border-b border-gray-100 py-5"
              >
                <View className="flex-row items-center">
                  <View className="bg-gray-100 p-3 rounded-2xl mr-4">
                    <User size={20} color="#6B7280" />
                  </View>
                  <View>
                    <Text className="text-gray-800 font-bold text-base">{passenger.user.fullName}</Text>
                    <Text className="text-gray-400 text-xs">ID: {passenger.id.slice(-6)} • {passenger.user.phone}</Text>
                  </View>
                </View>
                {passenger.checkInTime ? (
                  <CheckCircle2 size={24} color="#10B981" />
                ) : (
                  <Circle size={24} color="#D1D5DB" />
                )}
              </View>
            ))
          )}
          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
