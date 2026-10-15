import { useState, useEffect } from 'react';
import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import Manifest from '../database/models/Manifest';

export function useManifest(tripId: string) {
  const [passengers, setPassengers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;

    const subscription = database
      .get<Manifest>('manifests')
      .query(Q.where('trip_id', tripId))
      .observe()
      .subscribe(async (newPassengers) => {
        try {
          const passengersWithUsers = await Promise.all(
            newPassengers.map(async (passenger) => {
              const user = await (passenger.user as any).fetch();
              return {
                id: passenger.id,
                checkInTime: passenger.checkInTime,
                user: user ? {
                  fullName: user.fullName,
                  phone: user.phone,
                  emergencyContactName: user.emergencyContactName,
                  emergencyContactPhone: user.emergencyContactPhone,
                } : {
                  fullName: 'Anonymous Passenger',
                  phone: 'N/A',
                  emergencyContactName: 'N/A',
                  emergencyContactPhone: 'N/A'
                },
                rawPassenger: passenger,
              };
            })
          );
          setPassengers(passengersWithUsers);
        } catch (error) {
          console.error('Error fetching manifest user relations:', error);
        } finally {
          setLoading(false);
        }
      });

    return () => subscription.unsubscribe();
  }, [tripId]);

  return { passengers, loading };
}
