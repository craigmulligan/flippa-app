import { createStore, combineReducers } from 'redux'
import decode from 'jwt-decode'

export const actions = {
  setNavigation: navigation => ({
    type: 'SET_NAVIGATION',
    payload: navigation
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

const reducers = combineReducers({
  navigation
})

const store = createStore(reducers)

export default store
