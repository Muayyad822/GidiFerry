import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Clock,
  Ship,
  Calendar,
  CheckCircle2,
  Download,
} from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { useColorScheme } from 'nativewind';

export default function TicketDetailScreen({ route, navigation }: any) {
  const {
    manifestId = 'BK_UNKNOWN',
    tripName = 'MFV Omoluabi',
    origin = 'CMS',
    destination = 'Ikorodu',
    departureTime: departureTimeParam,
    status = 'upcoming',
  } = route.params || {};

  const departureTime = departureTimeParam ? new Date(departureTimeParam) : new Date();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'My GidiFerry Ticket',
        message:
          `🚢 GidiFerry Ticket\n\n` +
          `Booking ID: ${manifestId}\n` +
          `Route: ${origin} → ${destination}\n` +
          `Vessel: ${tripName}\n` +
          `Departure: ${departureTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })} at ${departureTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}\n\n` +
          `Show this Booking ID at the jetty for boarding.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share ticket details.');
    }
  };

  const isUpcoming = status === 'upcoming';

  return (
    <SafeAreaView className="flex-1 bg-pure-white dark:bg-slate-900">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4"
        >
          <ArrowLeft size={20} color={isDark ? '#94A3B8' : '#374151'} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-800 dark:text-slate-100">
            My Ticket
          </Text>
          <Text className="text-sm text-gray-400 dark:text-slate-500">
            Booking #{manifestId.substring(0, 10)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-waterway-blue/10 dark:bg-blue-900/30 p-3 rounded-2xl"
        >
          <Share2 size={20} color={isDark ? '#60A5FA' : '#005A9C'} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>

        {/* Status Banner */}
        <View
          className={`flex-row items-center justify-center p-4 rounded-2xl mb-6 ${
            isUpcoming
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700'
          }`}
        >
          <CheckCircle2
            size={18}
            color={isUpcoming ? '#10B981' : (isDark ? '#64748B' : '#9CA3AF')}
          />
          <Text
            className={`ml-2 font-bold text-sm uppercase tracking-wide ${
              isUpcoming ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'
            }`}
          >
            {isUpcoming ? 'Confirmed – Ready for Boarding' : 'Completed'}
          </Text>
        </View>

        {/* Route Card */}
        <View className="bg-waterway-blue dark:bg-blue-800 rounded-[32px] p-6 mb-6">
          <View className="flex-row items-center mb-4">
            <Ship size={20} color="rgba(255,255,255,0.7)" />
            <Text className="ml-2 text-white/70 font-medium">{tripName}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/60 text-xs uppercase mb-1">From</Text>
              <Text className="text-white text-2xl font-black">{origin}</Text>
            </View>
            <View className="items-center px-4">
              <Text className="text-sky-blue text-2xl">→</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-white/60 text-xs uppercase mb-1">To</Text>
              <Text className="text-white text-2xl font-black">{destination}</Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-6 pt-4 border-t border-white/20">
            <View className="flex-row items-center">
              <Calendar size={16} color="rgba(255,255,255,0.6)" />
              <Text className="ml-2 text-white/80 text-sm font-medium">
                {departureTime.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="rgba(255,255,255,0.6)" />
              <Text className="ml-2 text-white/80 text-sm font-medium">
                {departureTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code */}
        <View className="bg-white dark:bg-slate-800 rounded-[40px] p-8 mb-6 items-center border border-gray-100 dark:border-slate-700 shadow-sm">
          <Text className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Scan at Jetty to Board
          </Text>
          <View className="p-4 bg-white rounded-2xl border-4 border-waterway-blue/10">
            <QRCode
              value={manifestId}
              size={200}
              color="#005A9C"
              backgroundColor="white"
            />
          </View>
          <View className="mt-6 bg-gray-50 dark:bg-slate-700 px-4 py-2 rounded-full">
            <Text className="text-gray-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">
              {manifestId.substring(0, 16)}
            </Text>
          </View>
        </View>

        {/* Share Button */}
        <TouchableOpacity
          onPress={handleShare}
          className="bg-waterway-blue p-5 rounded-2xl flex-row justify-center items-center shadow-lg mb-6 active:opacity-90"
        >
          <Share2 size={20} color="#FFFFFF" />
          <Text className="ml-3 text-white font-bold text-lg">Share Ticket Details</Text>
        </TouchableOpacity>

        {/* Note */}
        <View className="bg-sky-blue/5 dark:bg-blue-900/20 border border-sky-blue/20 dark:border-blue-800 rounded-2xl p-4 mb-12">
          <Text className="text-waterway-blue dark:text-blue-400 font-bold text-sm mb-1">
            ℹ️ Boarding Instructions
          </Text>
          <Text className="text-gray-500 dark:text-slate-400 text-xs leading-5">
            Present this QR code or your Booking ID to the jetty officer before boarding. 
            Arrive at least 10 minutes before departure. 
            This ticket is non-transferable.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
