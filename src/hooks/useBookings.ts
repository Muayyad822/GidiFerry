import { useState, useEffect } from 'react';
import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import Manifest from '../database/models/Manifest';

export function useBookings(userId: string) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const subscription = database
      .get<Manifest>('manifests')
      .query(Q.where('user_id', userId))
      .observe()
      .subscribe(async (newBookings) => {
        try {
          const bookingsWithRelations = await Promise.all(
            newBookings.map(async (booking) => {
              const trip = await (booking.trip as any).fetch();
              let vessel = null;
              if (trip) {
                vessel = await (trip.vessel as any).fetch();
              }
              return {
                id: booking.id,
                checkInTime: booking.checkInTime,
                trip: trip ? {
                  id: trip.id,
                  origin: trip.origin,
                  destination: trip.destination,
                  departureTime: trip.departureTime,
                  status: trip.status,
                  vessel: vessel ? {
                    name: vessel.name,
                    capacity: vessel.capacity,
                  } : null,
                } : null,
                rawBooking: booking,
              };
            })
          );
          setBookings(bookingsWithRelations);
        } catch (error) {
          console.error('Error fetching booking relations:', error);
        } finally {
          setLoading(false);
        }
      });

    return () => subscription.unsubscribe();
  }, [userId]);

  return { bookings, loading };
}
