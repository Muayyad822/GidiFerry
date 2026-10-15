import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Share2, Calendar, ArrowRight, Ticket } from 'lucide-react-native';
import QRCodeDisplay from '../../components/Booking/QRCodeDisplay';

export default function BookingConfirmationScreen({ route, navigation }: any) {
  const { tripName = 'MFV Omoluabi', departureTime: departureTimeParam, passengerCount = 1, manifestId = 'BK_123456789', origin = 'CMS', destination = 'Ikorodu' } = route.params || {};
  const departureTime = departureTimeParam ? new Date(departureTimeParam) : new Date();

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'My GidiFerry Ticket',
        message:
          `🚢 GidiFerry Booking Confirmed!\n\n` +
          `Booking ID: ${manifestId}\n` +
          `Vessel: ${tripName}\n` +
          `Route: ${origin} → ${destination}\n` +
          `Departure: ${departureTime.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })} at ${departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n` +
          `Passengers: ${passengerCount}\n\n` +
          `Show Booking ID at the jetty for boarding.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share ticket details.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pure-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-12 mb-8">
          <View className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 size={64} color="#10B981" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 text-center">Booking Confirmed!</Text>
          <Text className="text-gray-500 text-center mt-2 px-8">
            Your seat on {tripName} is reserved. Show the QR code below at the jetty.
          </Text>
        </View>

        <View className="mb-8">
          <QRCodeDisplay
            value={manifestId}
            label={`Booking ID: ${manifestId.substring(0, 12)}`}
          />
        </View>

        <View className="bg-sky-blue/5 rounded-3xl p-6 mb-8 border border-sky-blue/10">
          <View className="flex-row items-center mb-4">
            <Calendar size={20} color="#005A9C" />
            <Text className="ml-3 text-waterway-blue font-bold text-lg">
              {departureTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-500 font-medium">Departure at</Text>
            <Text className="ml-2 text-waterway-blue font-bold">
              {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          {passengerCount > 1 && (
            <View className="flex-row items-center mt-3">
              <Text className="text-gray-500 font-medium">Passengers</Text>
              <Text className="ml-2 text-waterway-blue font-bold">{passengerCount}</Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className="w-[48%] bg-gray-100 p-4 rounded-2xl flex-row justify-center items-center"
            onPress={handleShare}
          >
            <Share2 size={20} color="#374151" />
            <Text className="ml-2 font-bold text-gray-700">Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] bg-sky-blue/10 p-4 rounded-2xl flex-row justify-center items-center border border-sky-blue/20"
            onPress={() => navigation.navigate('TicketDetail', {
              manifestId,
              tripName,
              origin,
              destination,
              departureTime: departureTimeParam,
              status: 'upcoming',
            })}
          >
            <Ticket size={20} color="#005A9C" />
            <Text className="ml-2 font-bold text-waterway-blue">My Ticket</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-waterway-blue p-6 rounded-[24px] flex-row justify-center items-center shadow-lg mb-12"
          onPress={() => navigation.navigate('CommuterMain')}
        >
          <Text className="text-pure-white font-bold text-xl">Back to Dashboard</Text>
          <ArrowRight size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
