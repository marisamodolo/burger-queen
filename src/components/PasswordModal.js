import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './Modal.css'

function PasswordModal (props){
    return (
            <section className="grid-recpass">
                <Button className="btn btn-close" onClick={props.onClickClose} text="&times;" />
                <p className="about-recpass">ENVIAREMOS UM E-MAIL DE RECUPERAÇÃO DE SENHA PARA VOCÊ.</p>
                <p className="p-recpass-email">E-MAIL</p>
                <div className= "inp-recpass-email">
                <Input value={props.valueEmail}
                    onChange={props.onChangeEmail} />
                    <i className="fas fa-envelope"></i>
                </div>
                <Button className="btn btn-recpass" text={props.textBtn} onClick={props.onClick} />
            </section>
    );
}

export default PasswordModal;