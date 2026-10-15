import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Scan, Ship, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OperatorDashboard from '../screens/Operator/OperatorDashboard';
import QRScannerScreen from '../screens/Operator/QRScannerScreen';
import TripManagementScreen from '../screens/Operator/TripManagementScreen';
import SettingsScreen from '../screens/Shared/SettingsScreen';

const Tab = createBottomTabNavigator();

// Placeholder
function Placeholder() {
  return null;
}

export default function OperatorTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Dashboard') icon = <LayoutDashboard size={size} color={color} />;
          else if (route.name === 'Scanner') icon = <Scan size={size} color={color} />;
          else if (route.name === 'Trips') icon = <Ship size={size} color={color} />;
          else if (route.name === 'Settings') icon = <Settings size={size} color={color} />;
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
      <Tab.Screen name="Dashboard" component={OperatorDashboard} />
      <Tab.Screen name="Scanner" component={QRScannerScreen} />
      <Tab.Screen name="Trips" component={TripManagementScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
