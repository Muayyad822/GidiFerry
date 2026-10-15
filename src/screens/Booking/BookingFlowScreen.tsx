import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchComponent from '../../components/Booking/SearchComponent';
import TripCard from '../../components/Booking/TripCard';
import { isNightBanActive, canIssueTicket } from '../../utils/safetyLogic';
import { useTrips } from '../../hooks/useTrips';
import { bookTicket } from '../../database/actions';
import { useAuth } from '../../context/AuthContext';

interface SearchFilter {
  origin: string;
  destination: string;
}

export default function BookingFlowScreen({ navigation }: any) {
  const { userId, deductBalance } = useAuth();
  const [origin, setOrigin] = useState('CMS');
  const [destination, setDestination] = useState('Ikorodu');
  const [passengerCount, setPassengerCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState<SearchFilter | null>(null);
  const { trips, loading } = useTrips();

  const handleSearch = () => {
    if (origin === destination) {
      Alert.alert('Invalid Route', 'Origin and destination cannot be the same jetty.');
      return;
    }
    setSearchFilter({ origin, destination });
  };

  const filteredTrips = searchFilter
    ? trips.filter(
        (t) =>
          t.origin === searchFilter.origin && t.destination === searchFilter.destination
      )
    : [];

  const handleBook = async (trip: any) => {
    if (isNightBanActive(trip.departureTime)) {
      Alert.alert('Booking Blocked', 'Cannot book trips after 18:30 due to maritime night ban.');
      return;
    }

    if (!canIssueTicket(trip.occupancy || 0, trip.capacity || 20)) {
      Alert.alert('Booking Blocked', 'Vessel has reached maximum capacity.');
      return;
    }

    const ticketFare = 1500;
    const totalFare = passengerCount * ticketFare;

    const paymentSuccess = await deductBalance(totalFare);
    if (!paymentSuccess) {
      Alert.alert(
        'Insufficient Balance',
        `Your wallet balance is insufficient. Total fare is ₦${totalFare.toLocaleString()}. Please top up your wallet.`
      );
      return;
    }

    try {
      const bookings = await bookTicket(userId || 'ANON_USER', trip.rawTrip.id, passengerCount);
      const firstManifestId = bookings && bookings.length > 0 ? bookings[0].id : 'BK_UNKNOWN';
      navigation.navigate('BookingConfirmation', {
        tripName: trip.boatName || 'MFV Omoluabi',
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime instanceof Date
          ? trip.departureTime.toISOString()
          : new Date(trip.departureTime).toISOString(),
        passengerCount: passengerCount,
        manifestId: firstManifestId,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to book ticket');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-waterway-blue dark:text-blue-400 mb-1">
            Book a Trip
          </Text>
          <Text className="text-sm text-gray-500 dark:text-slate-400">
            Find your next ferry ride in Lagos
          </Text>
        </View>

        <SearchComponent
          origin={origin}
          destination={destination}
          passengerCount={passengerCount}
          onSelectOrigin={setOrigin}
          onSelectDestination={setDestination}
          onPassengerCountChange={setPassengerCount}
          onSearch={handleSearch}
        />

        <View className="mb-4 mt-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
            Available Trips
          </Text>

          {!searchFilter ? (
            <View className="bg-white dark:bg-slate-800 p-8 rounded-3xl items-center border border-dashed border-gray-300 dark:border-slate-600">
              <Text className="text-2xl mb-3">🛥️</Text>
              <Text className="text-gray-400 dark:text-slate-400 text-center font-medium">
                Select a route above and tap Search Trips
              </Text>
            </View>
          ) : loading ? (
            <Text className="text-gray-400 dark:text-slate-500 text-center">Finding ferries...</Text>
          ) : filteredTrips.length === 0 ? (
            <View className="bg-white dark:bg-slate-800 p-8 rounded-3xl items-center border border-dashed border-gray-300 dark:border-slate-600">
              <Text className="text-2xl mb-3">😔</Text>
              <Text className="text-gray-400 dark:text-slate-400 text-center font-medium">
                No trips found for {searchFilter.origin} → {searchFilter.destination}
              </Text>
              <Text className="text-gray-300 dark:text-slate-500 text-center text-xs mt-2">
                Try another route or check back later.
              </Text>
            </View>
          ) : (
            filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                boatName={trip.boatName}
                departureTime={trip.departureTime}
                occupancy={trip.occupancy}
                capacity={trip.capacity}
                onBook={() => handleBook(trip)}
              />
            ))
          )}
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
