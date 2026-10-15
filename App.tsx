import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import SafetyProfileScreen from './src/screens/Auth/SafetyProfileScreen';
import EditProfileScreen from './src/screens/Auth/EditProfileScreen';
import BookingFlowScreen from './src/screens/Booking/BookingFlowScreen';
import BookingConfirmationScreen from './src/screens/Booking/BookingConfirmationScreen';
import { seedInitialData } from './src/database/actions';

import QRScannerScreen from './src/screens/Operator/QRScannerScreen';
import TripFormScreen from './src/screens/Operator/TripFormScreen';
import ManifestViewerScreen from './src/screens/Operator/ManifestViewerScreen';
import SOSScreen from './src/screens/Commuter/SOSScreen';
import SettingsScreen from './src/screens/Shared/SettingsScreen';
import TicketDetailScreen from './src/screens/Booking/TicketDetailScreen';

import CommuterTabNavigator from './src/navigation/CommuterTabNavigator';
import OperatorTabNavigator from './src/navigation/OperatorTabNavigator';

const Stack = createNativeStackNavigator();

function RoleSelectionScreen({ navigation }: any) {
  const { setUserRole } = useAuth();
  return (
    <View className="flex-1 bg-pure-white">
      <ImageBackground 
        source={require('./assets/lagos_waterway_hero.png')} 
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 justify-end p-6 bg-black/30">
          <View className="bg-pure-white p-8 rounded-[48px] shadow-2xl mb-4">
            <View className="items-center mb-6">
              <Image 
                source={require('./assets/GidiFerry-icon.png')} 
                style={{ width: 80, height: 80, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text className="text-4xl font-black text-waterway-blue">GidiFerry</Text>
              <Text className="text-gray-500 text-center text-lg mt-2">The fastest way across Lagos.</Text>
            </View>
            
            <TouchableOpacity 
              className="w-full bg-waterway-blue p-6 rounded-3xl mb-4 items-center shadow-lg active:opacity-90"
              onPress={() => { setUserRole('commuter'); navigation.navigate('SafetyProfile'); }}
            >
              <Text className="text-pure-white font-bold text-xl">I am a Commuter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-full bg-sky-blue/10 p-6 rounded-3xl items-center border-2 border-sky-blue/30 active:opacity-90"
              onPress={() => { setUserRole('operator'); navigation.navigate('SafetyProfile'); }}
            >
              <Text className="text-waterway-blue font-bold text-xl">I am an Operator</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function NavigationWrapper() {
  const { isProfileComplete, userRole } = useAuth();

  React.useEffect(() => {
    seedInitialData().catch(console.error);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isProfileComplete ? (
          <>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="SafetyProfile" component={SafetyProfileScreen} />
          </>
        ) : userRole === 'operator' ? (
          <>
            <Stack.Screen name="OperatorMain" component={OperatorTabNavigator} />
            <Stack.Screen name="QRScanner" component={QRScannerScreen} />
            <Stack.Screen name="TripForm" component={TripFormScreen} />
            <Stack.Screen name="ManifestViewer" component={ManifestViewerScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="CommuterMain" component={CommuterTabNavigator} />
            <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="SOS" component={SOSScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AuthProvider>
        <NavigationWrapper />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
