import { database } from './index';
import Trip from './models/Trip';
import Manifest from './models/Manifest';
import User from './models/User';
import Vessel from './models/Vessel';

export const createTrip = async (data: {
  vesselId: string;
  origin: string;
  destination: string;
  departureTime: Date;
}) => {
  return await database.write(async () => {
    return await database.get<Trip>('trips').create((trip) => {
      (trip._raw as any).vessel_id = data.vesselId;
      trip.origin = data.origin;
      trip.destination = data.destination;
      trip.departureTime = data.departureTime;
      trip.status = 'scheduled';
    });
  });
};

export const bookTicket = async (userId: string, tripId: string, quantity: number = 1) => {
  return await database.write(async () => {
    const created: Manifest[] = [];
    for (let i = 0; i < quantity; i++) {
      const record = await database.get<Manifest>('manifests').create((manifest) => {
        (manifest._raw as any).user_id = userId;
        (manifest._raw as any).trip_id = tripId;
      });
      created.push(record);
    }
    return created;
  });
};

export const checkInPassenger = async (manifestId: string) => {
  return await database.write(async () => {
    const manifest = await database.get<Manifest>('manifests').find(manifestId);
    await manifest.update((m) => {
      m.checkInTime = new Date();
    });
  });
};

export const seedInitialData = async () => {
  return await database.write(async () => {
    // Seed a vessel if none exists
    const vesselsCollection = database.get<Vessel>('vessels');
    const existingVessels = await vesselsCollection.query().fetch();
    
    let vessel1: Vessel;
    let vessel2: Vessel;
    if (existingVessels.length === 0) {
      vessel1 = await vesselsCollection.create((v) => {
        v.name = 'MFV Omoluabi';
        v.capacity = 20;
      });
      vessel2 = await vesselsCollection.create((v) => {
        v.name = 'LAGFERRY Eko';
        v.capacity = 25;
      });
    } else {
      vessel1 = existingVessels[0];
      vessel2 = existingVessels[1] || existingVessels[0];
    }

    // Seed trips if none exist
    const tripsCollection = database.get<Trip>('trips');
    const existingTrips = await tripsCollection.query().fetch();

    if (existingTrips.length === 0) {
      const today = new Date();

      // Trip 1: CMS -> Ikorodu at 10:00 AM today
      const trip1Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel1.id;
        t.origin = 'CMS';
        t.destination = 'Ikorodu';
        t.departureTime = trip1Time;
        t.status = 'scheduled';
      });

      // Trip 2: CMS -> Ikorodu at 2:30 PM today
      const trip2Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel2.id;
        t.origin = 'CMS';
        t.destination = 'Ikorodu';
        t.departureTime = trip2Time;
        t.status = 'scheduled';
      });

      // Trip 3: Ikorodu -> CMS at 12:00 PM today
      const trip3Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel1.id;
        t.origin = 'Ikorodu';
        t.destination = 'CMS';
        t.departureTime = trip3Time;
        t.status = 'scheduled';
      });

      // Trip 4: Falomo -> Badore at 11:30 AM today
      const trip4Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel2.id;
        t.origin = 'Falomo';
        t.destination = 'Badore';
        t.departureTime = trip4Time;
        t.status = 'scheduled';
      });

      // Trip 5: Badore -> Falomo at 3:45 PM today
      const trip5Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 45, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel1.id;
        t.origin = 'Badore';
        t.destination = 'Falomo';
        t.departureTime = trip5Time;
        t.status = 'scheduled';
      });

      // Trip 6: Mile 2 -> CMS at 1:15 PM today
      const trip6Time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 15, 0);
      await tripsCollection.create((t) => {
        (t._raw as any).vessel_id = vessel2.id;
        t.origin = 'Mile 2';
        t.destination = 'CMS';
        t.departureTime = trip6Time;
        t.status = 'scheduled';
      });
    }
  });
};

export const saveUserProfile = async (data: {
  fullName: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}) => {
  return await database.write(async () => {
    return await database.get<User>('users').create((user) => {
      user.fullName = data.fullName;
      user.phone = data.phone;
      user.emergencyContactName = data.emergencyContactName;
      user.emergencyContactPhone = data.emergencyContactPhone;
    });
  });
};
