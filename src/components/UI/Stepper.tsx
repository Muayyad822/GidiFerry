import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

interface StepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export default function Stepper({ value, onValueChange, min = 1, max = 10, label }: StepperProps) {
  const increment = () => {
    if (value < max) onValueChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onValueChange(value - 1);
  };

  return (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
      <View>
        {label && <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</Text>}
        <Text className="text-gray-800 font-bold text-lg">{value} {value === 1 ? 'Passenger' : 'Passengers'}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity 
          onPress={decrement}
          className={`p-3 rounded-2xl ${value === min ? 'bg-gray-50' : 'bg-sky-blue/10'}`}
          disabled={value === min}
        >
          <Minus size={20} color={value === min ? '#D1D5DB' : '#005A9C'} />
        </TouchableOpacity>
        <Text className="mx-6 text-xl font-bold text-waterway-blue">{value}</Text>
        <TouchableOpacity 
          onPress={increment}
          className={`p-3 rounded-2xl ${value === max ? 'bg-gray-50' : 'bg-sky-blue/10'}`}
          disabled={value === max}
        >
          <Plus size={20} color={value === max ? '#D1D5DB' : '#005A9C'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
