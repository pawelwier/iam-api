import { 
  createUser, findUserById, findUserByIdAndName, findUserByLoginData, findUserByName
} from "../services/userService.js"
import { getErrorResponse, getJsonResponse, validatePassword } from "./controllerUtils.js"

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
  const { id, name, password, confirmPassword } = body

  /*
    if data is missing -> status 400
    if all data provided, but passwords don't match OR id already in use -> status 401
  */

  // TODO: validation
  if (!id || !name || !password || !confirmPassword) return getErrorResponse(res, 'Fill in all register data')
  if (password !== confirmPassword) return getErrorResponse(res, 'Passwords don\'t match', 401, 'confirmPassword')
  if (!validatePassword(password)) return getErrorResponse(res, 'Password needs to be min. 8 characters, min. one number', 401, 'password')

  const user = await findUserById(id)
  if (!!user) return getErrorResponse(res, `User with the '${id}' id already exists`, 401, 'id')
  
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
  if (!await findUserByIdAndName(id, name)) return getErrorResponse(res, 'User with provided id and name doesn\'t exist', 404, 'name')
  if (!user) return getErrorResponse(res, 'Incorrect password', 401, 'password')

  return getJsonResponse(res, user)
}