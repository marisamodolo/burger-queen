import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './LoginBox.css'

function LoginBox (props){
    return (
            <section>
                <Input value={props.valueEmail}
                    placeholder="E-mail"
                    onChange={props.onChangeEmail} />
                <Input value={props.valueSenha}
                    placeholder={"Senha"}
                    onChange={props.onChangeSenha} />
                <Button text={props.textBtn} onClick={props.onClick} />
            </section>
    );
}

export default LoginBox;