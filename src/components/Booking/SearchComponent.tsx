import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Stepper from '../UI/Stepper';

const JETTIES = ['Ikorodu', 'CMS', 'Falomo', 'Badore', 'Mile 2'];

interface SearchComponentProps {
  origin: string;
  destination: string;
  passengerCount: number;
  onSelectOrigin: (jetty: string) => void;
  onSelectDestination: (jetty: string) => void;
  onPassengerCountChange: (count: number) => void;
  onSearch: () => void;
}

export default function SearchComponent({
  origin,
  destination,
  passengerCount,
  onSelectOrigin,
  onSelectDestination,
  onPassengerCountChange,
  onSearch,
}: SearchComponentProps) {
  return (
    <View className="bg-pure-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
      <View className="mb-4">
        <Text className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
          From
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {JETTIES.map((jetty) => (
            <TouchableOpacity
              key={`origin-${jetty}`}
              onPress={() => onSelectOrigin(jetty)}
              className={`px-4 py-2 rounded-full border ${
                origin === jetty
                  ? 'bg-waterway-blue border-waterway-blue'
                  : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600'
              }`}
            >
              <Text
                className={`${
                  origin === jetty
                    ? 'text-pure-white font-bold'
                    : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                {jetty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
          To
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {JETTIES.map((jetty) => (
            <TouchableOpacity
              key={`dest-${jetty}`}
              onPress={() => onSelectDestination(jetty)}
              className={`px-4 py-2 rounded-full border ${
                destination === jetty
                  ? 'bg-sky-blue border-sky-blue'
                  : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600'
              }`}
            >
              <Text
                className={`${
                  destination === jetty
                    ? 'text-waterway-blue font-bold'
                    : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                {jetty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-8">
        <Stepper
          value={passengerCount}
          onValueChange={onPassengerCountChange}
          label="Seats"
        />
      </View>

      <TouchableOpacity
        className="bg-waterway-blue p-5 rounded-2xl items-center shadow-lg shadow-waterway-blue/30 active:opacity-90"
        onPress={onSearch}
      >
        <Text className="text-pure-white font-bold text-lg">Search Trips</Text>
      </TouchableOpacity>
    </View>
  );
}
