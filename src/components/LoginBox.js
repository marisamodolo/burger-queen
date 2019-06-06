import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './LoginBox.css'

function LoginBox (props){
    return (
            <section class="grid">
                <p class="p-email">E-MAIL</p>
                <div className= "inp-email">
                <Input value={props.valueEmail}
                    onChange={props.onChangeEmail} />
                    <i class="fas fa-envelope"></i>
                </div>
                <p class="p-senha">SENHA</p>
                <div className= "inp-senha">
                <Input value={props.valueSenha}
                    onChange={props.onChangeSenha} />
                    <i class="fas fa-lock"></i>
                    <p class="p-forgotpass">ESQUECEU SUA SENHA?</p>
                </div>
                <Button text={props.textBtn} onClick={props.onClick} />
            </section>
    );
}

export default LoginBox;