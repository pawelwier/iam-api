import { 
  createUser, findUserById, findUserByLoginData, findUserByName
} from "../services/userService.js"
import { getErrorResponse, getJsonResponse } from "./controllerUtils.js"

export const getUser = async (req, res) => {
  const { id, name } = req.query
  if (id || name) {
    const user = id ? await findUserById(id) : await findUserByName(name)
    if (!user) return getErrorResponse(res, 'No such user exists', 404)
    return getJsonResponse(res, user)
  }
  return getErrorResponse(res, 'invalid query param', 404)
}

export const addUser = async (req, res) => {
  const { body } = req
  const { id, name, password } = body

  /* TODO: validation */
  if (!id || !name || !password) return getErrorResponse(res, 'invalid user data')

  try {
    const user = await createUser(body)
    return getJsonResponse(res, user)
  } catch(e) {
    return getErrorResponse(res, 'Error creating user')
  }
}

// TODO: refactor
export const loginUser = async (req, res) => {
  const { body } = req
  const { id, name, password } = body

  /* 
    TODO: validation, 
    separate error msgs for no id, name, password 
  */
  if (!id || !name || !password) return getErrorResponse(res, 'Fill in all login data')

  const user = await findUserByLoginData(body)

  /*
    if data is missing -> status 400
    if user with given id/name doesn't exist -> status 404
    if all data provided, but don't match -> status 401
  */
  if (!await findUserById(id)) return getErrorResponse(res, 'User with provided id doesn\'t exist', 404, 'id')
  if (!await findUserByName(name)) return getErrorResponse(res, 'User with provided id and name doesn\'t exist', 404, 'name')
  if (!user) return getErrorResponse(res, 'Incorrect password', 401, 'password')

  return getJsonResponse(res, user)
}