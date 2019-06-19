import React from 'react';

function OrderList (props){
    return (
        <div className="order-list">
            <h1 className="order-list-title">PEDIDO</h1>
            <div className="div-product">
            <p className="product-qnt">QUANT</p> 
            <p className="product-name">PRODUTO</p> 
            <p className="product-price">PREÇO</p>
            </div>
            <div className="order-list-content">
                {props.children}
            </div>
            <p className="total-value">Total: R$ {props.value}</p>
        </div>
    );
}

export default OrderList;