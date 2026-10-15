import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Scan, Users, Ship, ClipboardList, Settings } from 'lucide-react-native';

export default function OperatorDashboard({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8 mt-2">
          <View className="flex-row items-center">
            <Image 
              source={require('../../../assets/GidiFerry-icon.png')} 
              style={{ width: 40, height: 40, marginRight: 12 }}
              resizeMode="contain"
            />
            <View>
              <Text className="text-gray-500 text-base">Station Master,</Text>
              <Text className="text-3xl font-bold text-waterway-blue">Operator</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-gray-100 p-3 rounded-2xl">
            <Settings size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Current Trip Card */}
        <View className="bg-sky-blue/10 p-6 rounded-[32px] border-2 border-sky-blue/30 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <View className="bg-waterway-blue/10 px-4 py-2 rounded-full">
              <Text className="text-waterway-blue font-bold text-xs uppercase tracking-widest">En Route</Text>
            </View>
            <Text className="text-gray-500 font-medium">TRIP #1284</Text>
          </View>
          
          <View className="mb-6">
            <Text className="text-gray-500 text-sm mb-1">Vessel</Text>
            <Text className="text-waterway-blue text-2xl font-bold">MFV Omoluabi</Text>
          </View>

          <View className="flex-row justify-between mb-8">
            <View>
              <Text className="text-gray-500 text-xs mb-1">Passengers</Text>
              <View className="flex-row items-center">
                <Users size={16} color="#005A9C" />
                <Text className="text-waterway-blue font-bold text-lg ml-2">15 / 20</Text>
              </View>
            </View>
            <View>
              <Text className="text-gray-500 text-xs mb-1">Route</Text>
              <Text className="text-waterway-blue font-bold text-lg">CMS → Ikorodu</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-waterway-blue p-5 rounded-2xl flex-row justify-center items-center shadow-lg active:opacity-90"
            onPress={() => navigation.navigate('QRScanner', { tripId: 'TRIP_1284' })}
          >
            <Scan size={24} color="#FFFFFF" className="mr-2" />
            <Text className="text-pure-white font-bold text-lg ml-2">Scan Boarding Pass</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="w-[48%] bg-white p-6 rounded-3xl border border-gray-100 shadow-sm items-center"
            onPress={() => navigation.navigate('Trips')}
          >
            <View className="bg-sky-blue/10 p-3 rounded-2xl mb-3">
              <ClipboardList size={24} color="#005A9C" />
            </View>
            <Text className="text-gray-800 font-bold">View Manifest</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-[48%] bg-white p-6 rounded-3xl border border-gray-100 shadow-sm items-center"
            onPress={() => navigation.navigate('Settings')}
          >
            <View className="bg-sky-blue/10 p-3 rounded-2xl mb-3">
              <Ship size={24} color="#005A9C" />
            </View>
            <Text className="text-gray-800 font-bold">App Settings</Text>
          </TouchableOpacity>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
