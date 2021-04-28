import React, { useEffect } from 'react';
import { connect } from "react-redux"
import store from '../../redux/store';
import { getAllVideoGames } from '../../redux/actionCreators';

const Products = (videogames) => {


  useEffect(() => {
    store.dispatch(getAllVideoGames())
  }, [])

  return (
    <>
      <h1>Productos</h1>
    </>
  )
}

//mapea lo que hay en el estado y lo convierte a props (propiedaades)
const mapStateToProps = state => ({
  videogames: state.videogameReducer.videogames
})

// mapea las funciones y las  convierte a props (propiedaades)
const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps )(Products)
