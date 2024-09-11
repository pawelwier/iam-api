export const requiredString = {
  type: String,
  required: true
}

export const requiredUniqueString = {
  ...requiredString,
  unique: true
}