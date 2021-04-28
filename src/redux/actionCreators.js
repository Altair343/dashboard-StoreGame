import Axios from "axios";
import {
  GET_ALL_VIDEOGAME,
  GET_VIDEOGAME
} from "./actions";

const API_URL = 'http://localhost:4000/api';

/* const userLogged = window.localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${userLogged}`
  }
} */

export const getAllVideoGames = () => dispatch => {
  Axios.get(`${API_URL}/products`)
  .then(resp => {
      return dispatch({
        type:  GET_ALL_VIDEOGAME,
        videogames: resp.data.data
      })
    }
  )
}

export const getVideoGame = id => dispatch => {
  Axios.get(`${API_URL}/products/${id}`)
  .then(resp => {
      return dispatch({
        type: GET_VIDEOGAME,
        videogame: resp.data.data
      })
    }
  )
}
