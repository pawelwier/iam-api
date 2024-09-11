
import { Schema, model } from "mongoose"
import { requiredString, requiredUniqueString } from "./modelUtils.js"

const UserSchema = new Schema({
  id: requiredUniqueString, // id or alias
  name: requiredUniqueString, // only email?
  password: requiredString,
  createdAt: {
    type: Date,
    required: true
  },
  /*
    TODO:
    updatedAt,
    lastLoginAt,
    previousPasswords
  */
})

export const UserModel = model('user', UserSchema)