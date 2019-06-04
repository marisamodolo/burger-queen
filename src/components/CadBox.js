import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './LoginBox.css'

function CadBox (props){
    return (
            <section>
                <Input value={props.valueName}
                    placeholder="Nome"
                    onChange={props.onChangeEmail} />
                <Input value={props.valueEmail}
                    placeholder="E-Mail"
                    onChange={props.onChangeEmail} />
                <Input value={props.valueSenha}
                    placeholder={"Senha"}
                    onChange={props.onChangeSenha} />
                <div>
                    <input type="radio" id="opt-salao" defaultChecked/> 
                    <label htmlFor="opt-salao">
                        Salão
                    </label>
                    <input type="radio" id="opt-coz"/> 
                    <label htmlFor="opt-coz">
                        Cozinha
                    </label>
                </div>
                <Button text={props.textBtn} onClick={props.onClick} />

            </section>
    );
}

export default CadBox;