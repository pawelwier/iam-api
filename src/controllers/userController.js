import { createUser, findUserById, findUserByName } from "../services/userService.js"
import { getErrorResponse, getJsonResponse } from "./controllerUtils.js"

export const getUser = async (req, res) => {
  const { id, name } = req.query
  if (id || name) {
    const user = id ? await findUserById(id) : await findUserByName(name)
    if (!user) return getErrorResponse(res, 'No such user exists')
    return getJsonResponse(res, user)
  }
  return getErrorResponse(res, 'invalid query param')
}

export const addUser = async (req, res) => {
  const { body } = req
  const { id, name, password } = body

  /* TODO: validation */
  if (!id || !name || !password) return getErrorResponse(res, 'invalid user data')

  const user = await createUser(body)

  return getJsonResponse(res, user)
}