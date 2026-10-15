import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
  static table = 'users'

  @field('full_name') fullName!: string
  @field('phone') phone!: string
  @field('emergency_contact_name') emergencyContactName!: string
  @field('emergency_contact_phone') emergencyContactPhone!: string

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
