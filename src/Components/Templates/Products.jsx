import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import store from '../../redux/store';
import TargetVideogame from '../Molecules/TargetVideogame';
import { getAllVideoGames } from '../../redux/actionCreators';

const baseUrl = 'http://localhost:4000/api/products';
const userLogged = window.localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${userLogged}`,
    'Content-type': 'multipart/form-data'
  }
}

const Products = ({ match, videogames }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [catOne, setCatOne] = useState('');
  const [categories, setCategories] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [idProduct, setIdProduct] = useState('');
  const refModal = useRef(null);
  const refModal2 = useRef(null);

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
        refModal.current.style.display = "none";
        setTitle('');
        setDescription('');
        setPrice('');
        setCategories([]);
        setImgFile('');
        setCatOne('');
      }

    } catch (error) {
      console.log(error.response);
    }

  }

  const deletGame = async (id) => {
    axios.delete(`${baseUrl}/${id}`, config)
      .then(respond => {
        alert('Juego eliminado');
        store.dispatch(getAllVideoGames());
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  const edit = async (id) => {

    axios.get(`${baseUrl}/${id}`, config)
      .then(respond => {
        const dataProduct = respond.data.data;
        setIdProduct(dataProduct._id);
        setTitle(dataProduct.title);
        setDescription(dataProduct.description);
        setPrice(dataProduct.price);
        setCategories(dataProduct.categories);
        refModal2.current.style.display = "block";
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  const update = async (event) => {
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

  const deletCategory = (id) => {
    setCategories(categories.filter((item, key) => id !== key))
  }

  useEffect(() => {
    store.dispatch(getAllVideoGames())
  }, [match])

  return (
    <div className="data background-withe">
      <div className="barOptions">
        <h1>Productos</h1>
        <div className="btnAction">
          <button onClick={(e) => {
            setTitle('');
            setDescription('');
            setPrice('');
            setCategories([]);
            setImgFile('');
            setCatOne('');
            refModal.current.style.display = "block";
          }} className="btn btn-dark">Agregar</button>
        </div>
      </div>

      <div className="content-Videogames col-2">
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
        <div id="myModal" className="modal" ref={refModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Agregar Juego</h4>
              <i onClick={() => {
                refModal.current.style.display = "none";
              }} className="fas fa-times close"></i>
            </div>
            <div className="modal-body">
              <form onSubmit={addGame} >
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Titulo" />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    onChange={(e) => { setDescription(e.target.value) }}
                    type="text"
                    placeholder="descripción"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setPrice(e.target.value) }} type="text" placeholder="precio" />
                </div>
                <div className="mb-3 categories">
                  <input className="form-control" type="text" onChange={(e) => { setCatOne(e.target.value) }} value={catOne} placeholder="Categorias" />
                  <i onClick={() => {
                    if (catOne.trim()) {
                      setCategories([...categories, catOne]);
                      setCatOne('');
                    } else {
                      alert("Categoria vacia")
                    }
                  }} className="fas fa-plus-square add"></i>
                </div>
                <div className="mb-3">
                  {
                    categories &&
                    categories.map((item, id) => <span className="catego" key={id}>{item} <i onClick={() => { deletCategory(id) }} className="fas fa-times close"></i></span>)
                  }
                </div>
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setImgFile(e.target.files[0]) }} type="file" accept="image/*" />
                </div>

                <div className="mb-3">
                  <input type="submit" className="btn btn-dark w-100" value={`Guardar`} />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="myModal2" className="modal" ref={refModal2}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Editar {title}</h4>
              <i onClick={() => {
                refModal2.current.style.display = "none";
              }} className="fas fa-times close"></i>
            </div>
            <div className="modal-body">
              <form onSubmit={update} >
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" placeholder="Titulo" />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={description}
                    type="text"
                    placeholder="descripción"
                    rows="5"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setPrice(e.target.value) }} value={price} type="text" placeholder="precio" />
                </div>
                <div className="mb-3 categories">
                  <input className="form-control" type="text" onChange={(e) => { setCatOne(e.target.value) }} value={catOne} placeholder="Categorias" />
                  <i onClick={() => {
                    if (catOne.trim()) {
                      setCategories([...categories, catOne]);
                      setCatOne('');
                    } else {
                      alert("Categoria vacia")
                    }
                  }} className="fas fa-plus-square add"></i>
                </div>
                <div className="mb-3">
                  {
                    categories &&
                    categories.map((item, id) => <span className="catego" key={id}>{item} <i onClick={() => { deletCategory(id) }} className="fas fa-times close"></i></span>)
                  }
                </div>
                <div className="mb-3">
                  <input className="form-control" onChange={(e) => { setImgFile(e.target.files[0]) }} type="file" accept="image/*" />
                </div>
                <div className="mb-3">
                  <input type="submit" className="btn btn-dark w-100" value={`Actualizar`} />
                </div>
              </form>
            </div>
          </div>
        </div>



      </div>
    </div >
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
