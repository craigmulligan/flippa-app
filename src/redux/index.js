import { createStore, combineReducers } from 'redux'
import decode from 'jwt-decode'

export const actions = {
  setNavigation: navigation => ({
    type: 'SET_NAVIGATION',
    payload: navigation
  }),
  setCurrentUser: token => ({
    type: 'SET_CURRENT_USER',
    payload: token
  }),
  deleteCurrentUser: () => ({
    type: 'DELETE_CURRENT_USER'
  })
}

const navigation = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAVIGATION':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        token: action.payload,
        ...decode(action.payload)
      }
    case 'DELETE_CURRENT_USER':
      return {}
    default:
      return state
  }
}

const reducers = combineReducers({
  currentUser,
  navigation
})

const store = createStore(reducers)

export default store
