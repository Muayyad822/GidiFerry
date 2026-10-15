import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Clock, MapPin, Users } from 'lucide-react-native';
import { useTrips } from '../../hooks/useTrips';

export default function TripManagementScreen({ navigation }: any) {
  const { trips, loading } = useTrips();

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <View className="flex-1 px-6">
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <Text className="text-3xl font-bold text-waterway-blue">Trips</Text>
          <TouchableOpacity 
            className="bg-waterway-blue p-3 rounded-2xl"
            onPress={() => navigation.navigate('TripForm')}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {loading ? (
            <Text className="text-gray-400 text-center mt-10">Loading trips...</Text>
          ) : trips.length === 0 ? (
            <View className="bg-gray-50 p-10 rounded-[40px] items-center border border-dashed border-gray-200 mt-4">
              <Text className="text-gray-400 text-center">No trips scheduled. Click + to add your first trip.</Text>
            </View>
          ) : (
            trips.map(trip => (
              <TouchableOpacity 
                key={trip.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 mb-4 shadow-sm"
                onPress={() => navigation.navigate('ManifestViewer', { tripId: trip.id })}
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="bg-sky-blue/10 px-3 py-1 rounded-full">
                    <Text className="text-waterway-blue font-bold text-[10px] uppercase">{trip.status}</Text>
                  </View>
                  <Text className="text-gray-400 text-xs">#{trip.id.slice(-4)}</Text>
                </View>

                <View className="flex-row items-center mb-4">
                  <MapPin size={16} color="#005A9C" />
                  <Text className="ml-2 text-gray-800 font-bold text-lg">{trip.origin} → {trip.destination}</Text>
                </View>

                <View className="flex-row justify-between items-center pt-4 border-t border-gray-50">
                  <View className="flex-row items-center">
                    <Clock size={16} color="#6B7280" />
                    <Text className="ml-2 text-gray-500">
                      {trip.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Users size={16} color="#6B7280" />
                    <Text className="ml-2 text-gray-500">View Manifest</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
