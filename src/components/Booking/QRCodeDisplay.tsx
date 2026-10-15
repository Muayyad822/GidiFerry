import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
}

export default function QRCodeDisplay({ value, size = 200, label }: QRCodeDisplayProps) {
  return (
    <View className="items-center justify-center p-8 bg-white rounded-[40px] shadow-sm border border-gray-100">
      <View className="p-4 bg-white rounded-2xl border-4 border-waterway-blue/10">
        <QRCode
          value={value}
          size={size}
          color="#005A9C"
          backgroundColor="transparent"
        />
      </View>
      {label && (
        <View className="mt-6 bg-gray-50 px-4 py-2 rounded-full">
          <Text className="text-gray-500 font-bold text-xs tracking-widest uppercase">{label}</Text>
        </View>
      )}
    </View>
  );
}
