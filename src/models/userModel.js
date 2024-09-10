
import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  id: String, // id or alias
  name: String, // only email?
  password: String,
  createdAt: Date,
  /*
    TODO:
    updatedAt,
    lastLoginAt,
    previousPasswords
  */
})

export const UserModel = model('user', UserSchema)