import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'full_name', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'emergency_contact_name', type: 'string' },
        { name: 'emergency_contact_phone', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'vessels',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'capacity', type: 'number' },
        { name: 'license_number', type: 'string' },
        { name: 'latitude', type: 'number', isOptional: true },
        { name: 'longitude', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'trips',
      columns: [
        { name: 'vessel_id', type: 'string', isIndexed: true },
        { name: 'origin', type: 'string' },
        { name: 'destination', type: 'string' },
        { name: 'departure_time', type: 'number' },
        { name: 'status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'manifests',
      columns: [
        { name: 'trip_id', type: 'string', isIndexed: true },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'check_in_time', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})
