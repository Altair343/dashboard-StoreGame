import {
  GET_ROLE,
  GET_ALL_VIDEOGAME,
  GET_VIDEOGAME
} from "./actions";

export const roleReducer = (state = {}, action) => {
  if (action.type === GET_ROLE) {
    return {
      ...state,
      role: action.role
    }
  }
  return state
}

export const videogameReducer = (state = {}, action) => {
  if (action.type === GET_ALL_VIDEOGAME) {
    return {
      ...state,
      videogames: action.videogames
    }
  }

  if (action.type === GET_VIDEOGAME) {
    return {
      ...state,
      videogame: action.videogame
    }
  }
  return state
}
