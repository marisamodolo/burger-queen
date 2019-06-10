import React from 'react';
import Button from './Button.js'
import Input from './Input'
import './CadBox.css'

function CadBox (props){
    return (
        <section className="gridCad">
            <p className="cad-p-name">NOME</p>
            <div className= "div-inp-name">
                <Input value={props.valueName}
                onChange={props.onChangeName} />
                <i className="fas fa-user"></i>
            </div>
            <p className="cad-p-email">E-MAIL</p>
            <div className= "div-inp-email">
                <Input value={props.valueEmail}
                onChange={props.onChangeEmail} />
                <i className="fas fa-envelope"></i>
            </div>
            <p className="cad-p-senha">SENHA</p>
                <div className= "div-inp-senha">
                <Input type="password" value={props.valueSenha}
                onChange={props.onChangeSenha} />
                <i className="fas fa-lock"></i>
                </div>
            <form id="form-place" className= "div-inp-opt">
                <section className="opt-salao">
                    <input type="radio" name="option" value="hall" onChange={props.onChangePlace} id="opt-salao" defaultChecked/> 
                    <label htmlFor="opt-salao">SALÃO</label>
                </section>
                <section className="opt-coz">
                    <input type="radio" name="option" value="kitchen" onChange={props.onChangePlace} id="opt-coz"/> 
                    <label htmlFor="opt-coz">COZINHA</label>
                </section>
            </form>
            <Button className="btn cad-btn" text={props.textBtn} onClick={props.onClick} />
        </section>
    );
}

export default CadBox;