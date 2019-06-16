import React from 'react';

function ListItem (props){
    return (
        <div className="div-product"> 
            <p className="product-qnt">{props.amount} </p>
            <p className="product-name">{props.name}</p>
            <p className="product-price">{props.price} </p>
            <i className="fas fa-trash product-del-icon" onClick={props.onClick}></i>
            <span className="product-obs">{props.obs}</span>
        </div>
    );
}

export default ListItem;