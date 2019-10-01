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

const initialState = {
  favorites: [],
  isLoading: false,
  error: null,
  isLoaded: false
}

function rootReducer(state = initialState, action) {
  if (
    action.type === FAVORITES_LOADED ||
    action.type === REMOVE_FAVORITE_SUCCESS ||
    action.type === ADD_FAVORITE_SUCCESS
  ) {
    let favorites;
    if (action.type === FAVORITES_LOADED)
      favorites = action.payload
    else if (action.type === ADD_FAVORITE_SUCCESS)
      favorites = [...state.favorites, { eventId: action.payload }]
    else if (action.type === REMOVE_FAVORITE_SUCCESS) {
      const copy = [...state.favorites]
      const index = copy.findIndex(x => x.eventId == action.payload)
      if (index > -1)
        copy.splice(index, 1)
      favorites = copy
    }
    return {
      ...state,
      isLoading: false,
      error: null,
      isLoaded: true,
      favorites
    }
  }
  else if (
    action.type === FAVORITES_ERROR ||
    action.type === ADD_FAVORITE_ERROR ||
    action.type === REMOVE_FAVORITE_ERROR
  ) {
    let favorites = [...state.favorites]
    if (action.type === FAVORITES_ERROR)
      favorites = []
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      isLoaded: true,
      favorites
    }
  }
  else if (
    action.type === FAVORITES_LOADING ||
    action.type === ADD_FAVORITE_LOADING ||
    action.type === REMOVE_FAVORITE_LOADING
  ) {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }


  return state
}

export default rootReducer;