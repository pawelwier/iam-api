import { UserModel } from "../models/userModel.js"

// TODO: encrypt


export const findUserById = async id => (
  await UserModel.findOne({ id })
)

export const findUserByName = async name => (
  await UserModel.findOne({ name })
)

export const findUserByIdAndName = async (id, name) => (
  await UserModel.findOne({ id, name })
)

export const createUser = async ({ id, name, password }) => (
  await UserModel.create({
    id, name, password, createdAt: new Date() 
  })
)

export const findUserByLoginData = async ({ id, name, password }) => (
  await UserModel.findOne({ id, name, password })
)