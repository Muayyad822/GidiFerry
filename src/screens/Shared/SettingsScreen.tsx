import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { safeStorage } from '../../utils/safeStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Shield, Info, LogOut, Moon, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {
  const { logout, userRole, resetProfile } = useAuth();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [notifications, setNotifications] = React.useState(true);

  const isDark = colorScheme === 'dark';

  const handleDarkModeToggle = (val: boolean) => {
    setColorScheme(val ? 'dark' : 'light');
  };

  const settingItems = [
    {
      icon: <Bell size={20} color={isDark ? '#60A5FA' : '#005A9C'} />,
      label: 'Push Notifications',
      type: 'switch',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: <Moon size={20} color={isDark ? '#60A5FA' : '#005A9C'} />,
      label: 'Dark Mode',
      type: 'switch',
      value: isDark,
      onToggle: handleDarkModeToggle,
    },
    {
      icon: <Shield size={20} color={isDark ? '#60A5FA' : '#005A9C'} />,
      label: 'Privacy Policy',
      type: 'link',
    },
    {
      icon: <Info size={20} color={isDark ? '#60A5FA' : '#005A9C'} />,
      label: 'About GidiFerry',
      type: 'link',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-pure-white dark:bg-slate-900">
      <View className="px-6 mt-4 mb-8">
        <Text className="text-3xl font-bold text-waterway-blue dark:text-blue-400">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="bg-gray-50 dark:bg-slate-800 rounded-[32px] p-2 mb-8 border border-gray-100 dark:border-slate-700">
          {settingItems.map((item, index) => (
            <React.Fragment key={index}>
              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center">
                  <View className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-600">
                    {item.icon}
                  </View>
                  <Text className="ml-4 text-gray-800 dark:text-slate-100 font-bold">{item.label}</Text>
                </View>

                {item.type === 'switch' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#D1D5DB', true: isDark ? '#3B82F6' : '#005A9C' }}
                    thumbColor="#FFFFFF"
                  />
                ) : (
                  <ChevronRight size={20} color={isDark ? '#64748B' : '#9CA3AF'} />
                )}
              </View>
              {index < settingItems.length - 1 && (
                <View className="h-[1px] bg-gray-200 dark:bg-slate-700 mx-4" />
              )}
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-red-50 dark:bg-red-900/30 p-6 rounded-[24px] border border-red-100 dark:border-red-800 mb-4"
          onPress={logout}
        >
          <LogOut size={20} color="#DC2626" />
          <Text className="ml-3 text-red-600 dark:text-red-400 font-bold text-lg">Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center mb-12"
          onPress={async () => {
            await resetProfile();
            Alert.alert('Profile Reset', 'Your device profile data has been cleared.');
          }}
        >
          <Text className="text-gray-400 dark:text-slate-500 text-xs font-bold underline">
            Reset Safety Profile Data
          </Text>
        </TouchableOpacity>

        <View className="items-center mb-12">
          <Text className="text-gray-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
            Version 1.0.0 (MVP)
          </Text>
          <Text className="text-gray-300 dark:text-slate-600 text-[10px] mt-1">
            Made with ❤️ for Lagos Waterways
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
