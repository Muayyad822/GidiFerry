import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Map, Anchor, Wallet, History, AlertTriangle } from 'lucide-react-native';
import SOSButton from '../../components/Safety/SOSButton';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from 'nativewind';

export default function CommuterDashboard({ navigation }: any) {
  const { walletBalance, topUpBalance } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleTopUp = () => {
    Alert.alert(
      'Top Up Wallet',
      'Select a payment amount to add to your GidiFerry wallet:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '₦2,000', onPress: () => performTopUp(2000) },
        { text: '₦5,000', onPress: () => performTopUp(5000) },
        { text: '₦10,000', onPress: () => performTopUp(10000) },
      ]
    );
  };

  const performTopUp = async (amount: number) => {
    try {
      await topUpBalance(amount);
      Alert.alert('Success', `₦${amount.toLocaleString()} has been credited to your wallet.`);
    } catch (e) {
      Alert.alert('Error', 'Failed to complete transaction.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pure-white dark:bg-slate-900">
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
              <Text className="text-gray-500 dark:text-slate-400 text-base">Welcome back,</Text>
              <Text className="text-3xl font-bold text-waterway-blue dark:text-blue-400">Commuter</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-sky-blue/10 dark:bg-blue-900/30 p-3 rounded-2xl">
            <AlertTriangle size={24} color={isDark ? '#60A5FA' : '#005A9C'} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="bg-waterway-blue dark:bg-blue-800 p-6 rounded-[32px] shadow-xl mb-8">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-sky-blue/80 text-sm font-medium uppercase tracking-wider">Total Balance</Text>
              <Text className="text-pure-white text-4xl font-bold mt-1">
                ₦{walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <View className="bg-pure-white/20 p-2 rounded-xl">
              <Wallet size={24} color="#FFFFFF" />
            </View>
          </View>
          <TouchableOpacity
            className="bg-pure-white py-3 rounded-2xl items-center shadow-sm active:opacity-90"
            onPress={handleTopUp}
          >
            <Text className="text-waterway-blue font-bold">Top Up Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Actions Grid */}
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="w-[48%] bg-sky-blue/10 dark:bg-blue-900/30 p-6 rounded-3xl mb-4 items-center border border-sky-blue/20 dark:border-blue-700"
            onPress={() => navigation.navigate('BookingFlow')}
          >
            <View className="bg-waterway-blue dark:bg-blue-700 p-3 rounded-2xl mb-3">
              <Anchor size={24} color="#FFFFFF" />
            </View>
            <Text className="text-waterway-blue dark:text-blue-300 font-bold text-lg text-center">Book Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[48%] bg-sky-blue/10 dark:bg-blue-900/30 p-6 rounded-3xl mb-4 items-center border border-sky-blue/20 dark:border-blue-700"
            onPress={() => navigation.navigate('VesselMap')}
          >
            <View className="bg-waterway-blue dark:bg-blue-700 p-3 rounded-2xl mb-3">
              <Map size={24} color="#FFFFFF" />
            </View>
            <Text className="text-waterway-blue dark:text-blue-300 font-bold text-lg text-center">Live Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[48%] bg-sky-blue/10 dark:bg-blue-900/30 p-6 rounded-3xl mb-4 items-center border border-sky-blue/20 dark:border-blue-700"
            onPress={() => navigation.navigate('MyBookings')}
          >
            <View className="bg-waterway-blue dark:bg-blue-700 p-3 rounded-2xl mb-3">
              <History size={24} color="#FFFFFF" />
            </View>
            <Text className="text-waterway-blue dark:text-blue-300 font-bold text-lg text-center">My Trips</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View className="mt-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">Recent Activity</Text>
          <View className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] items-center border border-dashed border-gray-200 dark:border-slate-600">
            <Image
              source={require('../../../assets/no_bookings_illustration.png')}
              style={{ width: 150, height: 100, marginBottom: 16 }}
              resizeMode="contain"
            />
            <Text className="text-gray-400 dark:text-slate-500 text-center font-medium">
              No recent trips. Start sailing today!
            </Text>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
      <SOSButton />
    </SafeAreaView>
  );
}
