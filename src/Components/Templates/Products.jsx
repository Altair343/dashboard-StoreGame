import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import store from '../../redux/store';
import { getAllVideoGames } from '../../redux/actionCreators';
import TargetVideogame from '../Molecules/TargetVideogame';
import axios from "axios";

const Products = ({ match, videogames }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState(["terror", "acción"]);
  const [imgFile, setImgFile] = useState(null);
  const [idProduct, setIdProduct] = useState('');

  const baseUrl = 'http://localhost:4000/api/products';
  const userLogged = window.localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${userLogged}`,
      'Content-type': 'multipart/form-data'
    }
  }

  const addGame = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categories', categories);
    formData.append('imgFile', imgFile);

    try {
      const data = await axios.post(`${baseUrl}`, formData, config);
      if (data.data.response) {
        store.dispatch(getAllVideoGames());
        setTitle('');
        setDescription('');
        setPrice('');
        setCategories('');
        setImgFile('');
      }

    } catch (error) {
      console.log(error.response);
    }

  }

  const deletGame = async (id) => {
    axios.delete(`${baseUrl}/${id}`, config)
      .then(respond => {
        alert('Nota Eliminada');
        store.dispatch(getAllVideoGames());
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  const edit = async(id)=>{
    
    axios.get(`${baseUrl}/${id}`, config)
      .then(respond => {
        const dataProduct = respond.data.data;
        setIdProduct(dataProduct._id);
        setTitle(dataProduct.title);
        setDescription(dataProduct.description);
        setPrice(dataProduct.price);
        setCategories(dataProduct.categories);
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  const update = async(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categories', categories);
    formData.append('imgFile', imgFile);

    try {
      const data = await axios.put(`${baseUrl}/${idProduct}`, formData, config);
      if (data.data.response) {
        store.dispatch(getAllVideoGames());
        setTitle('');
        setDescription('');
        setPrice('');
        setCategories('');
        setImgFile('');
      }

    } catch (error) {
      console.log(error.response);
    }

  }


  useEffect(() => {
    store.dispatch(getAllVideoGames())
  }, [match])

  return (
    <div className="data background-withe">
      <div>
        <h1>Productos</h1>
      </div>
      <div className="content-Vudeogames col-3">
        {videogames &&
          videogames.map(t => (
            <TargetVideogame
              key={t._id}
              title={t.title}
              description={t.description}
              price={t.price}
              imgURL={t.imgURL}
              categories={t.categories}
              onclicAction={() => deletGame(t._id)}
              onclicEdit={() => edit(t._id)}
            />))
        }
      </div>

      <div className="actions">
        <div>
          <p>agregar productos de forma provicional</p>
          <form onSubmit={addGame} >
            <div>
              <input onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Titulo" />
            </div>
            <div>
              <input onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder="descripción" />
            </div>
            <div>
              <input onChange={(e) => { setPrice(e.target.value) }} type="text" placeholder="precio" />
            </div>
            <div>
              <input onChange={(e) => { setImgFile(e.target.files[0]) }} type="file" accept="image/*" />
            </div>
            <div>
              <input type="submit" className="btn btn-dark" value={`Guardar`} />
            </div>
          </form>
        </div>

        <div>
          <p>update productos de forma provicional</p>
          <form onSubmit={update} >
            <div>
              <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" placeholder="Titulo" />
            </div>
            <div>
              <input onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" placeholder="descripción" />
            </div>
            <div>
              <input onChange={(e) => { setPrice(e.target.value) }} value={price} type="text" placeholder="precio" />
            </div>
            <div>
              <input onChange={(e) => { setImgFile(e.target.files[0]) }} type="file" accept="image/*" />
            </div>
            <div>
              <input type="submit" className="btn btn-dark" value={`Actualizar`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

//mapea lo que hay en el estado y lo convierte a props (propiedaades)
const mapStateToProps = state => ({
  videogames: state.videogameReducer.videogames
})

// mapea las funciones y las  convierte a props (propiedaades)
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
