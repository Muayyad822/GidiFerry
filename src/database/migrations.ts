import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

// When you add columns or tables in the future, add a migration step here.
// This enables existing users' databases to be upgraded without data loss.
export const migrations = schemaMigrations({
  migrations: [
    // No migrations needed for initial schema version 1.
    // Example for future schema bumps:
    // {
    //   toVersion: 2,
    //   steps: [
    //     addColumns({ table: 'trips', columns: [{ name: 'notes', type: 'string', isOptional: true }] }),
    //   ],
    // },
  ],
})
