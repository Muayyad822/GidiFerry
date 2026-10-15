import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import BookingCard from '../../components/Booking/BookingCard';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from 'nativewind';

export default function MyBookingsScreen({ navigation }: any) {
  const { userId } = useAuth();
  const { bookings, loading } = useBookings(userId || '');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeBookings = bookings.filter(b => !b.checkInTime);
  const pastBookings = bookings.filter(b => b.checkInTime);

  return (
    <SafeAreaView className="flex-1 bg-pure-white dark:bg-slate-900">
      <View className="flex-1 px-6">
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <Text className="text-3xl font-bold text-waterway-blue dark:text-blue-400">My Trips</Text>
          <TouchableOpacity
            className="bg-waterway-blue/10 dark:bg-blue-900/30 p-3 rounded-2xl"
            onPress={() => navigation.navigate('BookingFlow')}
          >
            <Plus size={24} color={isDark ? '#60A5FA' : '#005A9C'} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="mb-8">
            <Text className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              Upcoming
            </Text>
            {loading ? (
              <Text className="text-gray-400 dark:text-slate-500 text-center">Loading trips...</Text>
            ) : activeBookings.length > 0 ? (
              activeBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  boatName={booking.trip?.vessel?.name || 'MFV Omoluabi'}
                  departureTime={booking.trip?.departureTime || new Date()}
                  origin={booking.trip?.origin || 'CMS'}
                  destination={booking.trip?.destination || 'Ikorodu'}
                  status="upcoming"
                  onPress={() => navigation.navigate('TicketDetail', {
                    manifestId: booking.id,
                    tripName: booking.trip?.vessel?.name || 'MFV Omoluabi',
                    origin: booking.trip?.origin || 'CMS',
                    destination: booking.trip?.destination || 'Ikorodu',
                    departureTime: booking.trip?.departureTime instanceof Date
                      ? booking.trip.departureTime.toISOString()
                      : new Date(booking.trip?.departureTime || Date.now()).toISOString(),
                    status: 'upcoming',
                  })}
                />
              ))
            ) : (
              <View className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] items-center border border-dashed border-gray-200 dark:border-slate-600">
                <Image
                  source={require('../../../assets/no_bookings_illustration.png')}
                  style={{ width: 150, height: 100, marginBottom: 16 }}
                  resizeMode="contain"
                />
                <Text className="text-gray-400 dark:text-slate-500 mt-2 text-center font-medium">
                  No upcoming trips. Ready to sail?
                </Text>
              </View>
            )}
          </View>

          <View className="mb-12">
            <Text className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              Past Trips
            </Text>
            {pastBookings.length === 0 ? (
              <Text className="text-gray-300 dark:text-slate-600 text-center text-sm">
                Your completed trips will appear here.
              </Text>
            ) : (
              pastBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  boatName={booking.trip?.vessel?.name || 'MFV Omoluabi'}
                  departureTime={booking.trip?.departureTime || new Date()}
                  origin={booking.trip?.origin || 'CMS'}
                  destination={booking.trip?.destination || 'Ikorodu'}
                  status="completed"
                  onPress={() => navigation.navigate('TicketDetail', {
                    manifestId: booking.id,
                    tripName: booking.trip?.vessel?.name || 'MFV Omoluabi',
                    origin: booking.trip?.origin || 'CMS',
                    destination: booking.trip?.destination || 'Ikorodu',
                    departureTime: booking.trip?.departureTime instanceof Date
                      ? booking.trip.departureTime.toISOString()
                      : new Date(booking.trip?.departureTime || Date.now()).toISOString(),
                    status: 'completed',
                  })}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
