import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ship, Clock, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface BookingCardProps {
  boatName: string;
  departureTime: Date;
  origin: string;
  destination: string;
  status: 'upcoming' | 'completed' | 'active';
  onPress?: () => void;
}

export default function BookingCard({ boatName, departureTime, origin, destination, status, onPress }: BookingCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isUpcoming = status === 'upcoming';

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-4 border border-gray-100 dark:border-slate-700 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center">
          <View className={`p-2 rounded-xl ${isUpcoming ? 'bg-sky-blue/10 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
            <Ship size={20} color={isUpcoming ? (isDark ? '#60A5FA' : '#005A9C') : (isDark ? '#94A3B8' : '#6B7280')} />
          </View>
          <Text className="ml-3 font-bold text-gray-800 dark:text-slate-100 text-lg">{boatName}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${status === 'active' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-700'}`}>
          <Text className={`text-[10px] font-bold uppercase tracking-wider ${status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'}`}>
            {status}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <View className="flex-1">
          <Text className="text-gray-400 dark:text-slate-500 text-xs uppercase mb-1">From</Text>
          <Text className="text-gray-800 dark:text-slate-200 font-semibold">{origin}</Text>
        </View>
        <View className="px-4">
          <ArrowRight size={16} color={isDark ? '#475569' : '#9CA3AF'} />
        </View>
        <View className="flex-1">
          <Text className="text-gray-400 dark:text-slate-500 text-xs uppercase mb-1">To</Text>
          <Text className="text-gray-800 dark:text-slate-200 font-semibold">{destination}</Text>
        </View>
      </View>

      <View className="flex-row items-center pt-4 border-t border-gray-50 dark:border-slate-700 justify-between">
        <View className="flex-row items-center">
          <Clock size={16} color={isDark ? '#60A5FA' : '#005A9C'} />
          <Text className="ml-2 text-waterway-blue dark:text-blue-400 font-medium">
            {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        {status === 'upcoming' && (
          <View className="flex-row items-center">
            <CheckCircle2 size={16} color="#10B981" />
            <Text className="ml-1 text-green-600 dark:text-green-400 text-xs font-bold">Confirmed</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
