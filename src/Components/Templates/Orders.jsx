import React, { useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../redux/store';
import { getAllOrders } from '../../redux/actionCreators';

const Orders = ({ match, orders }) => {

  useEffect(() => {
    store.dispatch(getAllOrders());
  }, [match])

  return (
    <>
      <div className="data background-withe">
        <div className="barOptions">
          <h1>Ordenes</h1>
        </div>

        <div className="content-Videogames col-2">
          {orders &&
            orders.map(ord => (
              <div key={ord._id} className="orderCard">
                <div className="imgCard">
                  <img src={ord.ProductId.imgURL} alt={ord.ProductId.title} />
                </div>
                <div>
                  <div className="mb-2">
                   <span className="ord_title"> Folio:</span> <span>{ord.paymentId}</span>
                  </div>
                  <div className="mb-2">
                    <span className="ord_title">UserId:</span> <span >{ord.userId}</span>
                  </div>
                  <div className="mb-2">
                    <span className="ord_title">Pago:</span> MXN $<span >{ord.amount}</span>
                  </div>
                  <div className="mb-2">
                    <a href={ord.receiptUrl} target="_blank" rel="noreferrer" className="ord_link">Ticket</a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

//mapea lo que hay en el estado y lo convierte a props (propiedaades)
const mapStateToProps = state => ({
  orders: state.ordersReducer.orders
})

export default connect(mapStateToProps, {})(Orders);
