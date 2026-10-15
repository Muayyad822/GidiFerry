import { Model } from '@nozbe/watermelondb'
import { date, readonly, relation } from '@nozbe/watermelondb/decorators'
import Trip from './Trip'
import User from './User'

export default class Manifest extends Model {
  static table = 'manifests'

  static associations = {
    trips: { type: 'belongs_to' as const, key: 'trip_id' },
    users: { type: 'belongs_to' as const, key: 'user_id' },
  }

  @relation('trips', 'trip_id') trip!: Trip
  @relation('users', 'user_id') user!: User
  
  @date('check_in_time') checkInTime?: Date

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
