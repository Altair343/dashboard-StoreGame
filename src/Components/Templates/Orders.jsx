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
          orders.map(ord => (<span key={ord._id}>{ord.paymentId}</span>))
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



export default connect(mapStateToProps,{})(Orders);
