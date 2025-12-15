import axios from "axios"
import {
  GET_ADDRESS,
  GET_CART_TOTAL_QUANTITY,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT,
  POST_ADDRESS,
} from "./actionTypes"

// UPDATED: Live Backend URL (Render)
const BASE_URL = "https://shopease-backend-8m20.onrender.com";

const getProdcutRequestAction = () => {
  return { type: GET_PRODUCT_REQUEST }
}

const getProdcutSuccessAction = (payload) => {
  return { type: GET_PRODUCT_SUCCESS, payload }
}

export const getProdcutErrorAction = () => {
  return { type: GET_PRODUCT_ERROR }
}

export const getSingleProdcutAction = (payload) => {
  return { type: GET_SINGLE_PRODUCT, payload }
}

export const getCarttotalQuantityAction = () => {
  return { type: GET_CART_TOTAL_QUANTITY }
}

export const postUserAddressAction = (payload) => {
  return { type: POST_ADDRESS, payload }
}

export const getUserAddressAction = () => {
  return { type: GET_ADDRESS }
}

// UPDATED: Now using BASE_URL
export const getWatches = (param) => (dispatch) => {
  dispatch(getProdcutRequestAction())
  axios
    .get(`${BASE_URL}/products/`, param)
    .then((res) => {
      console.log(res.data)
      dispatch(getProdcutSuccessAction(res.data))
    })
    .catch((er) => {
      dispatch(getProdcutErrorAction())
    })
}

// UPDATED: Now using BASE_URL
export const getsingleProduct = (id) => (dispatch) => {
  axios.get(`${BASE_URL}/products/${id}`).then((res) => {
    console.log(res.data)
    dispatch(getSingleProdcutAction(res.data))
  })
}

// UPDATED: Now using BASE_URL
export const postuserAddress = (userAddress) => (dispatch) => {
  axios
    .post(`${BASE_URL}/user/address`, userAddress)
    .then((res) => {
      console.log(res.data)
      dispatch(postUserAddressAction(res.data))
    })
    .catch((er) => {
      console.log(er)
    })
}

// UPDATED: Now using BASE_URL
export const getuserAddress = () => (dispatch) => {
  dispatch(postUserAddressAction())
  axios
    .get(`${BASE_URL}/user/address`)
    .then((res) => {
      // console.log(res.data)
      dispatch(getUserAddressAction())
    })
    .catch((er) => {
      console.log(er)
    })
}