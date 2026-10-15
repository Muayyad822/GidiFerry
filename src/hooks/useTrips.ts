import { useState, useEffect } from 'react';
import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import Trip from '../database/models/Trip';

export function useTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = database
      .get<Trip>('trips')
      .query(Q.where('status', Q.notEq('completed')))
      .observe()
      .subscribe(async (newTrips) => {
        try {
          const tripsWithRelations = await Promise.all(
            newTrips.map(async (trip) => {
              const vessel = await (trip.vessel as any).fetch();
              const manifests = await trip.manifests.fetch();
              return {
                id: trip.id,
                origin: trip.origin,
                destination: trip.destination,
                departureTime: trip.departureTime,
                status: trip.status,
                boatName: vessel ? vessel.name : 'MFV Omoluabi',
                capacity: vessel ? vessel.capacity : 20,
                occupancy: manifests ? manifests.length : 0,
                vesselId: vessel ? vessel.id : '',
                rawTrip: trip,
              };
            })
          );
          setTrips(tripsWithRelations);
        } catch (error) {
          console.error('Error fetching trip relations:', error);
        } finally {
          setLoading(false);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return { trips, loading };
}
