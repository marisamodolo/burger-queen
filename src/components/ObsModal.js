import React, {useState} from 'react';
import Button from './Button.js'
import './ObsModal.css'

function ObsModal (props){
    
  return (
    <section className="grid-additional">
      <Button className="btn btn-close" onClick={props.onClickClose} text="&times;" />
        <h1 className="title-type">SELECIONE O TIPO DE HAMBÚRGUER</h1>
			<form id="form-hamb-type" onChange={props.onChangeHamb} className= "div-opt-hamburguer">
				<section className="opt-bull">
					<input type="radio" name="hamburger" value="carne bovina"  id="opt-bull" defaultChecked/> 
					<label htmlFor="opt-bull">CARNE BOVINA</label>
				</section>
				<section className="opt-chicken">
					<input type="radio" name="hamburger" value="carne de frango"  id="opt-chicken"/> 
					<label htmlFor="opt-chicken">CARNE DE FRANGO</label>
				</section>
        <section className="opt-veg">
					<input type="radio" name="hamburger" value="vegetariano"  id="opt-veg"/> 
					<label htmlFor="opt-veg">VEGETARIANO</label>
				</section>
			</form>
        <h1 className="title-additional">ADICIONAR QUEIJO OU OVO?</h1>
      <form id="form-additional" className= "div-opt-additional">
				<section className="opt-eggs">
					<input type="checkbox" value="egg" onChange={props.onChangeEggs} id="opt-eggs"/> 
					<label htmlFor="opt-eggs">OVOS</label>
				</section>
				<section className="opt-cheese">
					<input type="checkbox" value="cheese" onChange={props.onChangeCheese} id="opt-cheese"/> 
					<label htmlFor="opt-cheese">QUEIJO</label>
				</section>
			</form>
      <Button className="btn btn-send" onClick={props.onClick} text="CONFIRMAR"/>
    </section>
    );
}

export default ObsModal;