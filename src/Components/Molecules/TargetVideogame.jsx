import React from 'react'

const TargetVideogame = ({ title, description, price, imgURL, categories, onclicAction, onclicEdit }) => {
  return (
    <div className="cartGame">
      <div className="contentImg">
        <img src={imgURL} alt={title} />
      </div>
      <div className="contentInfo">
        <div className="cart-title">
          <p>{title}</p>
        </div>
        <div className="cart-description">
          <p>{description}</p>
        </div>
        <div className="cart-price">
          <p>${price}</p>
        </div>
        <div className="cart-categories">
          {
            categories &&
            categories.map((e) => <span key={e} className="category">{e}</span>)
          }
        </div>
        <div className="cart-actions">

          <button type="button" className="btn btn-warning"
            onClick={onclicEdit}
          >Editar</button>

          <button type="button" className="btn btn-danger"
            onClick={onclicAction}
          >Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default TargetVideogame
