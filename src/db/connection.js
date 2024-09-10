import { connect } from "mongoose"

export const makeConnection = address => {
  try {
    connect(address)
  } catch(err) {
    console.error('Invalid mongo connection')
    console.error(err)
  }
}