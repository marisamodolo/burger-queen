import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './LoginBox.css'

function LoginBox (props){
    return (
            <section className="gridLog">
                <p className="p-email">E-MAIL</p>
                <div className= "inp-email">
                <Input value={props.valueEmail}
                    onChange={props.onChangeEmail} />
                    <i className="fas fa-envelope"></i>
                </div>
                <p className="p-senha">SENHA</p>
                <div className= "inp-senha">
                <Input type="password" value={props.valueSenha}
                    onChange={props.onChangeSenha} />
                    <i className="fas fa-lock"></i>
                    <p className="p-forgotpass">ESQUECEU SUA SENHA?</p>
                </div>
                <Button className="btn" text={props.textBtn} onClick={props.onClick} />
            </section>
    );
}

export default LoginBox;