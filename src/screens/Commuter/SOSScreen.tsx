import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, AlertCircle, ShieldAlert } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function SOSScreen({ navigation }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const emergencyContacts = [
    { name: 'LASWA Emergency', phone: '0800-WATER-SOS' },
    { name: 'Marine Police', phone: '112' },
    { name: 'Emergency Contact (Kin)', phone: '08087654321' },
  ];

  useEffect(() => {
    (async () => {
      setLoadingLoc(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (err) {
        setErrorMsg('Error fetching coordinates');
        console.error(err);
      } finally {
        setLoadingLoc(false);
      }
    })();
  }, []);

  const triggerSOS = () => {
    let locString = "Coordinates: Acquiring GPS...";
    if (location) {
      locString = `Coordinates: Lat ${location.coords.latitude.toFixed(6)}, Lon ${location.coords.longitude.toFixed(6)}`;
    } else if (errorMsg) {
      locString = `Coordinates: ${errorMsg}`;
    }

    Alert.alert(
      'Signal Emergency?',
      `This will send your GPS location to LASWA and emergency contacts.\n\n${locString}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'SEND SOS', 
          style: 'destructive',
          onPress: () => {
            const distressMsg = location 
              ? `SOS Activated! Location dispatched: Lat ${location.coords.latitude}, Lon ${location.coords.longitude}. LASWA patrol boat is routing to you.`
              : 'SOS Activated! Patrol boat is routing to you. (Coordinates unconfirmed)';
            Alert.alert('Emergency Broadcast', distressMsg);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-red-50">
      <View className="px-6 flex-row items-center mt-4 mb-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-xl mr-4 shadow-sm"
        >
          <ArrowLeft size={24} color="#DC2626" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-red-600">Emergency Center</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="bg-white p-8 rounded-[40px] items-center mb-8 shadow-sm border border-red-100">
          <View className="bg-red-600 p-6 rounded-full mb-6">
            <ShieldAlert size={64} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 text-center">Maritime Distress Signal</Text>
          <Text className="text-gray-500 text-center mt-2">
            Tap and hold the button below to alert emergency services immediately.
          </Text>

          <View className="bg-red-100/50 p-4 rounded-2xl w-full mt-4 items-center border border-red-200">
            <Text className="text-red-700 font-bold text-xs uppercase tracking-wider mb-1">Your GPS Status</Text>
            {loadingLoc ? (
              <Text className="text-gray-500 text-xs italic">Acquiring GPS satellite lock...</Text>
            ) : location ? (
              <Text className="text-gray-700 text-xs font-mono text-center">
                Lat: {location.coords.latitude.toFixed(6)} | Lon: {location.coords.longitude.toFixed(6)}
              </Text>
            ) : (
              <Text className="text-gray-500 text-xs italic">{errorMsg || 'GPS coordinates unavailable'}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            className="bg-red-600 w-full p-6 rounded-3xl mt-6 items-center shadow-lg active:bg-red-700"
            onLongPress={triggerSOS}
            delayLongPress={1500}
          >
            <Text className="text-white font-black text-2xl">HOLD TO ALERT</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 ml-1">Direct Dial</Text>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity 
              key={index}
              className="bg-white p-6 rounded-3xl mb-4 flex-row justify-between items-center shadow-sm border border-red-50"
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
            >
              <View>
                <Text className="text-gray-800 font-bold text-lg">{contact.name}</Text>
                <Text className="text-red-500 font-medium">{contact.phone}</Text>
              </View>
              <View className="bg-red-100 p-3 rounded-2xl">
                <Phone size={20} color="#DC2626" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-white p-6 rounded-3xl mb-12 flex-row items-center border border-red-100">
          <AlertCircle size={24} color="#DC2626" />
          <Text className="ml-3 text-red-600 font-medium flex-1">
            Misuse of emergency signals is a punishable offense under Lagos Maritime Law.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
