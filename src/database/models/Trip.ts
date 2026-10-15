import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, relation, children } from '@nozbe/watermelondb/decorators'
import Vessel from './Vessel'

export default class Trip extends Model {
  static table = 'trips'

  static associations = {
    vessels: { type: 'belongs_to' as const, key: 'vessel_id' },
    manifests: { type: 'has_many' as const, foreignKey: 'trip_id' },
  }

  @relation('vessels', 'vessel_id') vessel!: Vessel
  
  @field('origin') origin!: string
  @field('destination') destination!: string
  @date('departure_time') departureTime!: Date
  @field('status') status!: 'scheduled' | 'boarding' | 'enroute' | 'completed'

  @children('manifests') manifests!: any

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
