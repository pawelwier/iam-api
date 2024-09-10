import { UserModel } from "../models/userModel.js"

// TODO: encrypt

// TODO: for tests only
export const findUserById = async id => (
  await UserModel.findOne({ id })
)
export const findUserByName = async name => (
  await UserModel.findOne({ name })
)


export const createUser = async ({ id, name, password }) => (
  await UserModel.create({ id, name, password })
)