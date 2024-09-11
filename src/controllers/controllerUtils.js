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