import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TripCardProps {
  boatName: string;
  departureTime: Date;
  occupancy: number;
  capacity: number;
  onBook: () => void;
}

export default function TripCard({ boatName, departureTime, occupancy, capacity, onBook }: TripCardProps) {
  const seatsLeft = capacity - occupancy;
  const isFull = seatsLeft <= 0;

  const timeString = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4 flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-1">{boatName}</Text>
        <Text className="text-waterway-blue dark:text-blue-400 font-semibold mb-2">{timeString}</Text>
        <View className="flex-row items-center">
          <View className={`w-2 h-2 rounded-full mr-2 ${isFull ? 'bg-red-500' : 'bg-green-500'}`} />
          <Text className="text-sm text-gray-600 dark:text-slate-400">
            {isFull ? 'Full capacity' : `${seatsLeft} seats left`}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        disabled={isFull}
        className={`px-6 py-3 rounded-xl ${isFull ? 'bg-gray-300 dark:bg-slate-600' : 'bg-sky-blue'}`}
        onPress={onBook}
      >
        <Text className={`font-bold ${isFull ? 'text-gray-500 dark:text-slate-400' : 'text-waterway-blue'}`}>
          {isFull ? 'Sold Out' : 'Book'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
