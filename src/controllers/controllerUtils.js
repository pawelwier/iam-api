export const getErrorResponse = (res, msg) => (
  res
    .status(400)
    .send({ msg })
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