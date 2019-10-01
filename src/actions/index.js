import {
  FAVORITES_ERROR,
  FAVORITES_LOADED,
  FAVORITES_LOADING,
  ADD_FAVORITE_ERROR,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_LOADING,
  REMOVE_FAVORITE_ERROR,
  REMOVE_FAVORITE_LOADING,
  REMOVE_FAVORITE_SUCCESS
} from "../constants/action-types"
import axiosConfig from '../axios/config'

export function removeFavorite(eventId) {
  return async dispatch => {
    dispatch({ type: REMOVE_FAVORITE_LOADING })
    try {
      await axiosConfig.delete('/profile/favorites/' + eventId)
      dispatch({ type: REMOVE_FAVORITE_SUCCESS, payload: eventId })
    }
    catch (error) {
      if (error.response)
        dispatch({ type: REMOVE_FAVORITE_ERROR, payload: error.response.data })
      else
        dispatch({ type: REMOVE_FAVORITE_ERROR, payload: 'Server is not available' })
    }
  }
}

export function addFavorite(eventId) {
  return async dispatch => {
    dispatch({ type: ADD_FAVORITE_LOADING })
    try {
      await axiosConfig.post('/profile/favorites', { eventId })
      dispatch({ type: ADD_FAVORITE_SUCCESS, payload: eventId })
    }
    catch (error) {
      if (error.response)
        dispatch({ type: ADD_FAVORITE_ERROR, payload: error.response.data })
      else
        dispatch({ type: ADD_FAVORITE_ERROR, payload: 'Server is not available' })
    }
  }
}

export function loadFavorites() {
  return async dispatch => {
    dispatch({ type: FAVORITES_LOADING })
    try {
      const response = await axiosConfig.get('/profile/favorites')
      dispatch({ type: FAVORITES_LOADED, payload: response.data })
    }
    catch (error) {
      if (error.response)
        dispatch({ type: FAVORITES_ERROR, payload: error.response.data })
      else
        dispatch({ type: FAVORITES_ERROR, payload: 'Server is not available' })
    }
  }
}