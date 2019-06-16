import React, {useState} from 'react';
import Button from './Button.js'
import Input from './Input'
import './Login/Modal.css'

function ObsModal (props){
  const [email, setEmail] = useState('');
    
  return (
    <section className="grid-recpass">
      <Button className="btn btn-close" onClick={props.onClickClose} text="&times;" />
      <p className="about-recpass">ENVIAREMOS UM E-MAIL DE RECUPERAÇÃO DE SENHA PARA VOCÊ.</p>
      <p className="p-recpass-email">E-MAIL</p>
      <div className= "inp-recpass-email">
        <Input value={email}
        onChange={event => setEmail(event.target.value)} />
        <i className="fas fa-envelope"></i>
      </div>
      <Button className="btn btn-recpass" text="ENVIAR"/>
    </section>
    );
}

export default ObsModal;