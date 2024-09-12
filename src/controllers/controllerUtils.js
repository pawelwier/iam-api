// TODO: take status as param?
export const getErrorResponse = (res, msg, status = 400, id = null) => (
  res
    .status(status)
    .send({ msg, id })
)

export const getJsonResponse = (res, data) => {
  try {
    return res
      .status(200)
      .json(data)
  } catch (err) {
    return getErrorResponse(res, 'Invalid data request')
  }
}

export const validatePassword = password => {
  const chars = password?.split('')
  const hasSpaces = chars.some(el => el === ' ')
  const hasInt = chars.some(el => Number(el) === parseInt(el, 10))
  return password && password.length > 7 && !hasSpaces && hasInt
}
