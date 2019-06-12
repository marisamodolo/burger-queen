import React from 'react';
import Button from './Button.js'
import Input from './Input'

function ListItem (props){
    return (
        <div key = {props.key} className="div-product"> 
            <p className="product-qnt">{props.amount} </p>
            <p className="product-name">{props.name}</p>
            <p className="product-price">{props.price} </p>
            <i class="fas fa-trash product-del-icon" onClick={props.onClick}></i>
        </div>
    );
}

export default ListItem;