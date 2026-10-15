import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import DepartureTrigger from '../../components/Operator/DepartureTrigger';
import { database } from '../../database';
import Manifest from '../../database/models/Manifest';
import { checkInPassenger } from '../../database/actions';

export default function QRScannerScreen({ route, navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedPassengers, setScannedPassengers] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  // Example Trip ID passed via params
  const tripId = route?.params?.tripId || 'TRIP_123';

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-6">
        <Text className="text-white text-center mb-6 text-lg">We need camera access to scan passenger tickets.</Text>
        <TouchableOpacity 
          className="bg-waterway-blue px-6 py-3 rounded-xl"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }: { type: string, data: string }) => {
    if (isScanning) return;
    if (data && !scannedPassengers.includes(data)) {
      setIsScanning(true);
      try {
        // Query manifest from WatermelonDB
        const manifest = await database.get<Manifest>('manifests').find(data);
        
        if (!manifest) {
          Alert.alert('Invalid Ticket', 'This ticket does not exist in the database.');
          setIsScanning(false);
          return;
        }

        // Validate trip matching
        if ((manifest._raw as any).trip_id !== tripId) {
          Alert.alert('Invalid Trip', 'This ticket is registered for a different ferry trip.');
          setIsScanning(false);
          return;
        }

        // Check double scanning
        if (manifest.checkInTime) {
          Alert.alert('Already Checked In', 'This ticket has already been used to board.');
          setIsScanning(false);
          return;
        }

        // Complete check-in in database
        await checkInPassenger(data);

        setScannedPassengers(prev => [...prev, data]);
        Alert.alert('Passenger Checked In', 'Ticket verified. Enjoy your voyage!');
      } catch (error) {
        console.error('Failed to process QR ticket check-in:', error);
        Alert.alert('Scan Error', 'Could not read ticket. Please make sure it is a valid booking QR Code.');
      } finally {
        setIsScanning(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      <SafeAreaView className="absolute top-0 left-0 right-0">
        <View className="flex-row items-center p-4">
          <TouchableOpacity 
            className="bg-black/50 w-10 h-10 rounded-full items-center justify-center border border-white/20"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white text-xl font-bold">←</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 shadow-2xl">
        <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />
        <Text className="text-3xl font-bold text-waterway-blue mb-2">Manifest Scanner</Text>
        <Text className="text-gray-500 mb-6 text-lg">
          Passengers checked in: <Text className="text-waterway-blue font-bold">{scannedPassengers.length}</Text>
        </Text>
        
        <DepartureTrigger 
          tripId={tripId} 
          onDepart={() => navigation.navigate('Dashboard')} 
        />
      </View>
    </View>
  );
}
