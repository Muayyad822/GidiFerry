import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
// NOTE: PROVIDER_GOOGLE is intentionally omitted so iOS falls back to Apple Maps
// (no API key needed). For Android, set a valid Google Maps API key in app.json
// under expo.android.config.googleMaps.apiKey

// Waterway coordinates connecting Lagos CMS Jetty and Ikorodu Jetty across the lagoon
const cmsToIkoroduPath = [
  { latitude: 6.4485, longitude: 3.4013 },
  { latitude: 6.4680, longitude: 3.4140 },
  { latitude: 6.4950, longitude: 3.4280 },
  { latitude: 6.5200, longitude: 3.4380 },
  { latitude: 6.5430, longitude: 3.4490 },
  { latitude: 6.5650, longitude: 3.4610 },
  { latitude: 6.5820, longitude: 3.4730 },
  { latitude: 6.6010, longitude: 3.4880 },
  { latitude: 6.6169, longitude: 3.5042 },
];

export default function VesselMapScreen() {
  const [positions, setPositions] = useState({
    omoluabiIdx: 0,
    ekoIdx: cmsToIkoroduPath.length - 1,
    omoluabiDir: 1, // 1 = CMS to Ikorodu, -1 = reverse
    ekoDir: -1,     // -1 = Ikorodu to CMS, 1 = reverse
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setPositions((prev) => {
        let nextOmoluabiIdx = prev.omoluabiIdx + prev.omoluabiDir;
        let nextOmoluabiDir = prev.omoluabiDir;
        if (nextOmoluabiIdx >= cmsToIkoroduPath.length) {
          nextOmoluabiIdx = cmsToIkoroduPath.length - 2;
          nextOmoluabiDir = -1;
        } else if (nextOmoluabiIdx < 0) {
          nextOmoluabiIdx = 1;
          nextOmoluabiDir = 1;
        }

        let nextEkoIdx = prev.ekoIdx + prev.ekoDir;
        let nextEkoDir = prev.ekoDir;
        if (nextEkoIdx >= cmsToIkoroduPath.length) {
          nextEkoIdx = cmsToIkoroduPath.length - 2;
          nextEkoDir = -1;
        } else if (nextEkoIdx < 0) {
          nextEkoIdx = 1;
          nextEkoDir = 1;
        }

        return {
          omoluabiIdx: nextOmoluabiIdx,
          ekoIdx: nextEkoIdx,
          omoluabiDir: nextOmoluabiDir,
          ekoDir: nextEkoDir,
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const omoluabiPos = cmsToIkoroduPath[positions.omoluabiIdx];
  const ekoPos = cmsToIkoroduPath[positions.ekoIdx];

  const vessels = [
    {
      id: '1',
      name: 'MFV Omoluabi',
      latitude: omoluabiPos.latitude,
      longitude: omoluabiPos.longitude,
      speed: '18 knots',
      status: positions.omoluabiDir === 1 ? 'CMS → Ikorodu' : 'Ikorodu → CMS',
    },
    {
      id: '2',
      name: 'LAGFERRY Eko',
      latitude: ekoPos.latitude,
      longitude: ekoPos.longitude,
      speed: '22 knots',
      status: positions.ekoDir === 1 ? 'CMS → Ikorodu' : 'Ikorodu → CMS',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-waterway-blue z-10 shadow-md">
        <View className="p-4 pb-6">
          <Text className="text-2xl font-bold text-pure-white">Live Vessel Map</Text>
          <Text className="text-sky-blue/90 font-medium">Track CMS ⇋ Ikorodu ferries in real-time</Text>
        </View>
      </SafeAreaView>
      
      <MapView
        style={StyleSheet.absoluteFillObject}
        className="flex-1"
        initialRegion={{
          latitude: 6.5344,
          longitude: 3.4492,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}
      >
        {vessels.map((vessel) => (
          <Marker
            key={vessel.id}
            coordinate={{ latitude: vessel.latitude, longitude: vessel.longitude }}
            title={vessel.name}
            description={`${vessel.status} • Speed: ${vessel.speed}`}
          >
            <View className="bg-waterway-blue border-2 border-pure-white p-3 rounded-full items-center justify-center shadow-lg">
              <Text style={{ fontSize: 18 }}>🚢</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
