import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { schema } from './schema'
import { migrations } from './migrations'
import User from './models/User'
import Vessel from './models/Vessel'
import Trip from './models/Trip'
import Manifest from './models/Manifest'

// LokiJS adapter with AsyncStorage persistence — works in Expo Go without
// any native build. Data is serialized to AsyncStorage on every write,
// so it survives app restarts, background/foreground cycles, and device reboots.
//
// NOTE: When you're ready to build a standalone app / production APK, you can
// switch to SQLiteAdapter (see src/database/index.sqlite.ts) for better
// performance on large datasets.
const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: false,
  dbName: 'gidiferry',
  // Persist to AsyncStorage on React Native (Expo Go compatible)
  asyncStorage: AsyncStorage as any,
  onSetUpError: (error: Error) => {
    console.error('WatermelonDB setup error:', error);
  },
})

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Vessel,
    Trip,
    Manifest,
  ],
})
