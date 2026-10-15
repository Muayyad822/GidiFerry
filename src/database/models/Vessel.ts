import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators'

export default class Vessel extends Model {
  static table = 'vessels'

  @field('name') name!: string
  @field('capacity') capacity!: number
  @field('license_number') licenseNumber!: string
  @field('latitude') latitude?: number
  @field('longitude') longitude?: number

  @children('trips') trips!: any

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
