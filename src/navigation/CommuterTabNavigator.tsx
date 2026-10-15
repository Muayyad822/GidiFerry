import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Anchor, Map, Ticket, User } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommuterDashboard from '../screens/Commuter/CommuterDashboard';
import VesselMapScreen from '../screens/Commuter/VesselMapScreen';
import MyBookingsScreen from '../screens/Commuter/MyBookingsScreen';
import SafetyProfileScreen from '../screens/Auth/SafetyProfileScreen';
import SettingsScreen from '../screens/Shared/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function CommuterTabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') icon = <Anchor size={size} color={color} />;
          else if (route.name === 'VesselMap') icon = <Map size={size} color={color} />;
          else if (route.name === 'MyBookings') icon = <Ticket size={size} color={color} />;
          else if (route.name === 'Profile') icon = <User size={size} color={color} />;
          return icon;
        },
        tabBarActiveTintColor: '#005A9C',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: (Platform.OS === 'ios' ? 60 : 70) + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      })}
    >
      <Tab.Screen name="Home" component={CommuterDashboard} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="VesselMap" component={VesselMapScreen} options={{ tabBarLabel: 'Live Map' }} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ tabBarLabel: 'My Trips' }} />
      <Tab.Screen name="Profile" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}
